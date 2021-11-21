import React, { FC, useEffect, useState } from "react";
import { ForceAtlasControl, SigmaContainer } from "react-sigma-v2";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { omit, mapValues, keyBy, constant, filter } from "lodash";


import GraphSettingsController from "../handlers/GraphSettingsController";
import GraphEventsController from "../handlers/GraphEventsController";
import GraphDataController from "../handlers/GraphDataController";
import FullScreenButton from "./FullScreenButton";
import { Dataset, FiltersState } from "../types";
import ZoomButtons from "./ZoomButtons";
import drawLabel from "../canvas-utils";
import GraphTitle from "./GraphTitle";

import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiBookContent } from "react-icons/bi";
import NewGraphDataController from "../handlers/NewGraphDataController";

const Root: FC = () => {
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {}
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Load data on mount:
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => res.json())
      .then((dataset: Dataset) => {
        setDataset(dataset);
        console.log(dataset);
        setFiltersState({
          clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
          tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
        });
        requestAnimationFrame(() => setDataReady(true));
      });
  }, []);

  if (!dataset) return null;

  return (
    <div id="app-root" className={showContents ? "show-contents" : ""}>
      <SigmaContainer
        graphOptions={{ type: "directed" }}
        initialSettings={{
          nodeProgramClasses: { image: getNodeProgramImage() },
          labelRenderer: drawLabel,
          defaultNodeType: "image",
          defaultEdgeType: "arrow",
          labelDensity: 0.07,
          labelGridCellSize: 60,
          labelRenderedSizeThreshold: 15,
          labelFont: "Lato, sans-serif",
          zIndex: true,
        }}
        className="react-sigma"
      >
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />        
        <GraphDataController dataset={dataset} filters={filtersState} />
        {/* <NewGraphDataController dataset={dataset} filters={filtersState} setHoveredNode={setHoveredNode} hoveredNode={hoveredNode}/> */}
        
        {dataReady && (
          <>
            <div className="controls">
              <button
                type="button"
                className="ico show-contents"
                onClick={() => setShowContents(true)}
                title="Show caption and description"
              >
                <BiBookContent />
              </button>
              <ZoomButtons />
            </div>
            <div className="contents">
              {/* <button
                type="button"
                className="ico hide-contents"
                onClick={() => setShowContents(false)}
                title="Show caption and description"
              >
                <GrClose />
              </button> */}
              {/* <GraphTitle filters={filtersState} /> */}
            </div>
          </>
        )}
      </SigmaContainer>
    </div>
    
  );
};

export default Root;
