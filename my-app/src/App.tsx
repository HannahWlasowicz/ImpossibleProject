import React from 'react';
import './App.css';
import Graph from "graphology";
import Sigma from "sigma";

function onClick() {
  window.console.log("clicked!");
}

function App() {
  const container = document.getElementById("sigma-container") as HTMLElement;
  const graph = new Graph();
  // graph.addNode("John", { x: 0, y: 10, size: 5, label: "John" });
  // graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary" });
  // graph.addEdge("John", "Mary");

  // const sigInst = new Sigma(graph, container);



  // sigInst.on('downnodes', onClick);
  return (
    <div className="App" id="sigma-container">
    </div>
  );
}

export default App;
