import { useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";

import { Dataset, FiltersState } from "../types";

const MIN_NODE_SIZE = 1;
const MAX_NODE_SIZE = 10;

const GraphDataController: FC<{ dataset: Dataset; filters: FiltersState }> = ({ dataset, filters,  children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  /**
   * Feed graphology with the new dataset:
   */
  useEffect(() => {
    if (!graph || !dataset) return;

    const clusters = keyBy(dataset.clusters, "key");
    // const tags = keyBy(dataset.tags, "key");

    dataset.nodes.forEach((node) =>
      graph.addNode(node.key, {
        ...node,
        x: Math.random()*(100-1)+1,
        y: Math.random()*(100-1)+1,
        ...omit(clusters[node.cluster], "key"),
      }),
    );
    dataset.edges.forEach(([source, target]) => graph.addEdge(source, target, { size: .1 }));

    // Use degrees as node sizes:
    const scores = graph.nodes().map((node) => graph.getNodeAttribute(node, "score"));
    const minDegree = Math.min(...scores);
    const maxDegree = Math.max(...scores);

    graph.forEachNode((node) =>
      graph.setNodeAttribute(
        node,
        "size",
        ((graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
          (MAX_NODE_SIZE - MIN_NODE_SIZE) +
          MIN_NODE_SIZE,
      ),
    );

    return () => graph.clear();
  }, [graph, dataset]);

  return <>{children}</>;
};

export default GraphDataController;
