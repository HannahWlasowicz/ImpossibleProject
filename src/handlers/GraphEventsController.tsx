import { useRegisterEvents, useSigma, useSetSettings } from "react-sigma-v2";
import React, { FC, useEffect } from "react";
// import "../components/Dropdowns";
// import Dropdowns from "../components/Dropdowns";
// import "../components/Dropdowns";
import testFunc from "../components/Temp";

function getMouseLayer() {
	return document.querySelector(".sigma-mouse");
}

const GraphEventsController: FC<{ setHoveredNode: (node: string | null) => void }> = ({ setHoveredNode, children }) => {
	const sigma = useSigma();
	const graph = sigma.getGraph();
	const registerEvents = useRegisterEvents();
	var isDragging = false;
	var draggedNode: string | null = null;
	/**
	 * Initialize here settings that require to know the graph and/or the sigma
	 * instance:
	 */
	useEffect(() => {
		registerEvents({
			clickNode({ node }) {
				if (!graph.getNodeAttribute(node, "hidden")) {
					console.log(node);
					// this.updates(node.key);
					testFunc();
					// update(node.key);
					//   window.open(graph.getNodeAttribute(node, "URL"), "_blank");
				}
			},
			enterNode({ node }) {
				setHoveredNode(node.toString());
			},
			leaveNode() {
				setHoveredNode(null);
			},
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

	return <>{children}</>;
};

export default GraphEventsController;
