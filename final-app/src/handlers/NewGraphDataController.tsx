import { FC, useEffect, useState } from "react";
import { keyBy, omit } from "lodash";
import { rng, faTime } from "../components/random";
import { DirectedGraph, UndirectedGraph } from "graphology";
import { Attributes, NodeKey } from "graphology-types";
import randomLayout from "graphology-layout/random";
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import { drawHover } from "../canvas-utils";
import useDebounce from "../use-debounce";

import {
    useSigma,
    useRegisterEvents,
    useLoadGraph,
    useSetSettings,
  } from "react-sigma-v2";

  import { Dataset, FiltersState } from "../types";

  function getMouseLayer() {
    return document.querySelector(".sigma-mouse");
  }
  const NODE_FADE_COLOR = "#bbb";
const EDGE_FADE_COLOR = "#eee";

  const NewGraphDataController: FC<{ dataset: Dataset; filters: FiltersState; setHoveredNode: (node: string | null) => void;  hoveredNode: string | null  }> = ({ dataset, filters, setHoveredNode, hoveredNode, children }) => {
    const sigma = useSigma();
    // const graph = sigma.getGraph();
    const loadGraph = useLoadGraph();
    const graph = erdosRenyi(DirectedGraph, { order: dataset.nodes.length, probability: 0.1, rng });
    const registerEvents = useRegisterEvents();
    const debouncedHoveredNode = useDebounce(hoveredNode, 40);
	var isDragging = false;
	var draggedNode: string | null = null;
  
    /**
     * Feed graphology with the new dataset:
     */
    useEffect(() => {
      if (!graph || !dataset) return;
      // graph = erdosRenyi(DirectedGraph, { order: 100, probability: 0.1, rng });
      randomLayout.assign(graph);
      const clusters = keyBy(dataset.clusters, "key");
      // const tags = keyBy(dataset.tags, "key");
  
      dataset.nodes.forEach((node) =>
        
        graph.addNode(node.key, {
          ...node,
          x: Math.random()*(100-1)+1,
          y: Math.random()*(100-1)+1,
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
      // console.log(graph.getNodeAttributes);
      loadGraph(graph);
      
      return () => graph.clear();
    }, [graph, dataset]);
  

    // useEffect(() => {
    //   setSettings({
    //     labelRenderedSizeThreshold: 9,
    //     nodeReducer: (node, data) => {
    //       const graph = sigma.getGraph();
    //       const newData: Attributes = { ...data, highlighted: data.highlighted || false };
  
    //       if (hoveredNode) {
    //         if (node === hoveredNode || (graph.neighbors(hoveredNode) as Array<NodeKey>).includes(node)) {
    //           newData.highlighted = true;
    //         } else {
    //           newData.color = "#E2E2E2";
    //           newData.highlighted = false;
    //         }
    //       }
    //       return newData;
    //     },
    //     edgeReducer: (edge, data) => {
    //       const graph = sigma.getGraph();
    //       const newData = { ...data, hidden: false };
  
    //       if (hoveredNode && !(graph.extremities(edge) as Array<NodeKey>).includes(hoveredNode)) {
    //         newData.hidden = true;
    //       }
    //       return newData;
    //     },
    //   });
    // }, [hoveredNode]);
  /**
   * Apply filters to graphology:
  //  */
  useEffect(() => {
    const { clusters, tags } = filters;
    graph.forEachNode((node, { cluster, tag }) =>
      graph.setNodeAttribute(node, "hidden", !clusters[cluster]),
    );
  }, [graph, filters]);

  useEffect(() => {
		registerEvents({
			clickNode({ node }) {
				if (!graph.getNodeAttribute(node, "hidden")) {
					console.log(node);
					//   window.open(graph.getNodeAttribute(node, "URL"), "_blank");
				}
			},
			enterNode({ node }) {
				setHoveredNode(node.toString());
				// TODO: Find a better way to get the DOM mouse layer:
				const mouseLayer = getMouseLayer();
				if (mouseLayer) mouseLayer.classList.add("mouse-pointer");
			},
		// 	leaveNode() {
		// 		setHoveredNode(null);
		// 		// TODO: Find a better way to get the DOM mouse layer:
		// 		const mouseLayer = getMouseLayer();
		// 		if (mouseLayer) mouseLayer.classList.remove("mouse-pointer");
		// 	},
			downNode({ node }) {
				isDragging = true;
				draggedNode = node.toString();
				graph.setNodeAttribute(draggedNode, "highlighted", true);
				sigma.getCamera().disable();
			}
		});
		sigma.getMouseCaptor().on("mousemove", (e) => {
			if (!isDragging || !draggedNode) return;

			// Get new position of node
			const pos = sigma.viewportToGraph(e);

			graph.setNodeAttribute(draggedNode, "x", pos.x);
			graph.setNodeAttribute(draggedNode, "y", pos.y);
		});
		sigma.getMouseCaptor().on("mouseup", () => {
			if (draggedNode) {
				graph.removeNodeAttribute(draggedNode, "highlighted");
			}
			isDragging = false;
			draggedNode = null;
			sigma.getCamera().enable();
		});

		// Disable the autoscale at the first down interaction
		sigma.getMouseCaptor().on("mousedown", () => {
			if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
		});
	}, []);

  

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    sigma.setSetting("hoverRenderer", (context, data, settings) =>
      drawHover(context, { ...sigma.getNodeDisplayData(data.key), ...data }, settings),
    );
  }, [sigma, graph]);

  /**
   * Update node and edge reducers when a node is hovered, to highlight its
   * neighborhood:
   */
  useEffect(() => {
    const hoveredColor: string = debouncedHoveredNode ? sigma.getNodeDisplayData(debouncedHoveredNode)!.color : "";

    sigma.setSetting(
      "nodeReducer",
      debouncedHoveredNode
        ? (node, data) =>
            node === debouncedHoveredNode ||
            graph.hasEdge(node, debouncedHoveredNode) ||
            graph.hasEdge(debouncedHoveredNode, node)
              ? { ...data, zIndex: 1 }
              : { ...data, zIndex: 0, label: "", color: NODE_FADE_COLOR, image: null, highlighted: false }
        : null,
    );
    sigma.setSetting(
      "edgeReducer",
      debouncedHoveredNode
        ? (edge, data) =>
            graph.hasExtremity(edge, debouncedHoveredNode)
              ? { ...data, color: hoveredColor, size: 4 }
              : { ...data, color: EDGE_FADE_COLOR, hidden: true }
        : null,
    );
  }, [debouncedHoveredNode]);

  return <>{children}</>;
};

export default NewGraphDataController;
