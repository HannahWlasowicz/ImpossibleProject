import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";
import { rng, faTime } from "../components/random";
import { UndirectedGraph } from "graphology";
import { Attributes, NodeKey } from "graphology-types";
import randomLayout from "graphology-layout/random";
import erdosRenyi from "graphology-generators/random/erdos-renyi";

import { Dataset } from "../types";
import {
    useSigma,
    useRegisterEvents,
    useLoadGraph,
  } from "react-sigma-v2";

const NewGraphDataController: FC<{ dataset: Dataset;  }> = ({ dataset,  children }) => {
//   const sigma = useSigma();
//   const graph = sigma.getGraph();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const graph = erdosRenyi(UndirectedGraph, { order: 100, probability: 0.1, rng });
  /**
   * Feed graphology with the new dataset:
   */
  useEffect(() => {
    if (!dataset) return;
    
    
    randomLayout.assign(graph);
    dataset.nodes.forEach(node => {
      graph.mergeNodeAttributes(node.key, {
        ...node,
      });
    });
    loadGraph(graph);

    dataset.edges.forEach(([source, target]) => graph.addEdge(source, target, { size: 1 }));

    // Use degrees as node sizes:
    // const scores = graph.nodes().map((node) => graph.getNodeAttribute(node, "score"));
    // const minDegree = Math.min(...scores);
    // const maxDegree = Math.max(...scores);
    // const MIN_NODE_SIZE = 3;
    // const MAX_NODE_SIZE = 30;
    // graph.forEachNode((node) =>
    //   graph.setNodeAttribute(
    //     node,
    //     "size",
    //     ((graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
    //       (MAX_NODE_SIZE - MIN_NODE_SIZE) +
    //       MIN_NODE_SIZE,
    //   ),
    // );

    return () => graph.clear();
  }, [graph]);

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
