import { rng, faTime } from "../components/random";
import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { UndirectedGraph } from "graphology";
import { Attributes, NodeKey } from "graphology-types";
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import circularLayout from "graphology-layout/circular";
import chroma from "chroma-js";
import faker from "faker";

import {
  ControlsContainer,
  ForceAtlasControl,
  useSigma,
  useRegisterEvents,
  useLoadGraph,
  useSetSettings,
  SearchControl,
  SigmaContainer,
  ZoomControl,
} from "react-sigma-v2";
// import "../src/assets/index.scss";

interface MyCustomGraphProps {
  children?: ReactNode;
}

export const MyCustomGraph: React.FC<MyCustomGraphProps> = ({ children }) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState<NodeKey | null>(null);

  useEffect(() => {
    // Create the graph
    const graph = erdosRenyi(UndirectedGraph, { order: 100, probability: 0.1, rng });
    circularLayout.assign(graph);
    graph.nodes().forEach(node => {
      graph.mergeNodeAttributes(node, {
        label: faker.name.findName(),
        size: Math.max(4, Math.random() * 10),
        color: chroma.random().hex(),
      });
    });
    loadGraph(graph);

    // Register the events
    registerEvents({
      enterNode: event => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, []);

  useEffect(() => {
    setSettings({
      labelRenderedSizeThreshold: 9,
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData: Attributes = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (node === hoveredNode || (graph.neighbors(hoveredNode) as Array<NodeKey>).includes(node)) {
            newData.highlighted = true;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !(graph.extremities(edge) as Array<NodeKey>).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode]);

  return <>{children}</>;
};

ReactDOM.render(
  <React.StrictMode>
    <SigmaContainer>
      <MyCustomGraph />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <ForceAtlasControl autoRunFor={faTime || 2000} />
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl />
      </ControlsContainer>
    </SigmaContainer>
  </React.StrictMode>,
  document.getElementById("root"),
);