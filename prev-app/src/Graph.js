import React, { useState } from "react";
import "./styles.css";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";

const graph = {
  nodes: [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" }
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]
};
const selectedNode = 0

export default function App() {

  function getNode(){
    return selectedNode
  }

  
  const [graphData, setGraphData] = useState(graph);
  const [nodeData, setNodeState] = useState(selectedNode)
  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };
  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
      setNodeState(nodes[0])
    }

  };

  return (
    <div className="App">
      <Graph key={uuidv4} graph={graphData} options={options} events={events} />
      <h2>Node Selected: {nodeData}</h2>
    </div>
  );
}
