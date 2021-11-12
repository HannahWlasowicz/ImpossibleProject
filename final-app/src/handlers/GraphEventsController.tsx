import { useRegisterEvents, useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";

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
					//   window.open(graph.getNodeAttribute(node, "URL"), "_blank");
				}
			},
			enterNode({ node }) {
				setHoveredNode(node.toString());
				// TODO: Find a better way to get the DOM mouse layer:
				const mouseLayer = getMouseLayer();
				if (mouseLayer) mouseLayer.classList.add("mouse-pointer");
			},
			leaveNode() {
				setHoveredNode(null);
				// TODO: Find a better way to get the DOM mouse layer:
				const mouseLayer = getMouseLayer();
				if (mouseLayer) mouseLayer.classList.remove("mouse-pointer");
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
