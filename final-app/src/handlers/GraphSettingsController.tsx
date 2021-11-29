import { useSigma, useSetSettings} from "react-sigma-v2";
import React, { FC, useEffect } from "react";

import { Attributes } from "graphology-types";
import { drawHover } from "../canvas-utils";
const NODE_FADE_COLOR = "#bbb";
const EDGE_FADE_COLOR = "#eee";

const GraphSettingsController: FC<{ hoveredNode: string | null }> = ({ children, hoveredNode }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

   const setSettings = useSetSettings();

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
    setSettings({
      nodeReducer: (node: string, data: { [key: string]: unknown }) => {
        const graph = sigma.getGraph();
        const newData: Attributes = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (node === hoveredNode || (graph.neighbors(hoveredNode) as Array<string>).includes(node)) {
            newData.highlighted = true;
            newData.color = "#000000";
          } else {
            
            newData.highlighted = false;
          }
        } else{
          //console.log("HEY!")
        }
        return newData;
      },
      edgeReducer: (edge: string, data: { [key: string]: unknown }) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false};
        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        } else{
          //console.log("HEY EDGE!")
        }
        return newData;

      },
    });
  }, [hoveredNode]);


  return <>{children}</>;
};

export default GraphSettingsController;
