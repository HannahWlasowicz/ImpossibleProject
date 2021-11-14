import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";
import { rng, faTime } from "../components/random";
import { DirectedGraph, UndirectedGraph } from "graphology";
import { Attributes, NodeKey } from "graphology-types";
import randomLayout from "graphology-layout/random";
import erdosRenyi from "graphology-generators/random/erdos-renyi";

import {
    useSigma,
    useRegisterEvents,
    useLoadGraph,
  } from "react-sigma-v2";

  import { Dataset, FiltersState } from "../types";

  const NewGraphDataController: FC<{ dataset: Dataset; filters: FiltersState }> = ({ dataset, filters,  children }) => {
    const sigma = useSigma();
    // const graph = sigma.getGraph();
    const loadGraph = useLoadGraph();
    const graph = erdosRenyi(DirectedGraph, { order: 100, probability: 0.1, rng });
  
    /**
     * Feed graphology with the new dataset:
     */
    useEffect(() => {
      if (!graph || !dataset) return;
      randomLayout.assign(graph);
      const clusters = keyBy(dataset.clusters, "key");
      // const tags = keyBy(dataset.tags, "key");
  
      dataset.nodes.forEach((node) =>
        graph.addNode(node.key, {
          ...node,
          // x: Math.random()*(100-1)+1,
          // y: Math.random()*(100-1)+1,
          ...omit(clusters[node.cluster], "key"),
          // image: `${process.env.PUBLIC_URL}/images/${tags[node.tag].image}`,
        }),
      );
      dataset.edges.forEach(([source, target]) => graph.addEdge(source, target, { size: 1 }));
  
      // Use degrees as node sizes:
      const scores = graph.nodes().map((node) => graph.getNodeAttribute(node, "score"));
      const minDegree = Math.min(...scores);
      const maxDegree = Math.max(...scores);
      const MIN_NODE_SIZE = 3;
      const MAX_NODE_SIZE = 30;
      graph.forEachNode((node) =>
        graph.setNodeAttribute(
          node,
          "size",
          ((graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
            (MAX_NODE_SIZE - MIN_NODE_SIZE) +
            MIN_NODE_SIZE,
        ),
      );
      loadGraph(graph);
      
      return () => graph.clear();
    }, [graph, dataset]);
  

  /**
   * Apply filters to graphology:
  //  */
  // useEffect(() => {
  //   const { clusters, tags } = filters;
  //   graph.forEachNode((node, { cluster, tag }) =>
  //     graph.setNodeAttribute(node, "hidden", !clusters[cluster] || !tags[tag]),
  //   );
  // }, [graph, filters]);

  return <>{children}</>;
};

export default NewGraphDataController;
