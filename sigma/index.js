"use strict";
exports.__esModule = true;
var graphology_1 = require("graphology");
var sigma_1 = require("sigma");
var container = document.getElementById("sigma-container");
var graph = new graphology_1["default"]();
graph.addNode("John", { x: 0, y: 10, size: 5, label: "John" });
graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary" });
graph.addEdge("John", "Mary");
var sigInst = new sigma_1["default"](graph, container);
function onClick(event) {
    window.console.log("clicked!");
}
sigInst.on('downnodes', onClick);
