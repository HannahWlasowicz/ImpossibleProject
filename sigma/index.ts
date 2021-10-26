import Graph from "graphology";
import Sigma from "sigma";
import chroma from "chroma-js";
import { v4 as uuid } from "uuid";

const container = document.getElementById("sigma-container") as HTMLElement;

const graph = new Graph();

graph.addNode("John", { x: 0, y: 10, size: 5, label: "John" });
graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary" });

graph.addEdge("John", "Mary");

const sigInst = new Sigma(graph, container);

function onClick(event) {
    window.console.log("clicked!");
} 

sigInst.on('downnodes',onClick);