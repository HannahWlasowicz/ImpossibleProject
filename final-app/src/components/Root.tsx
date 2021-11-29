import React, { FC, useEffect, useState } from "react";
import { ForceAtlasControl, SigmaContainer, ControlsContainer, SearchControl,ZoomControl } from "react-sigma-v2";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { omit, mapValues, keyBy, constant, filter } from "lodash";


import GraphSettingsController from "../handlers/GraphSettingsController";
import GraphEventsController from "../handlers/GraphEventsController";
import GraphDataController from "../handlers/GraphDataController";
import { Dataset, FiltersState } from "../types";
import drawLabel from "../canvas-utils";

import "react-sigma-v2/lib/react-sigma-v2.css";

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
        graphOptions={{ type: "undirected" }}
        initialSettings={{
          nodeProgramClasses: { image: getNodeProgramImage() },
          labelRenderer: drawLabel,
          labelDensity: 1,
          defaultNodeType: "image",
          defaultEdgeType: "line",
          labelRenderedSizeThreshold: 15,
          labelFont: "Lato, sans-serif",
          zIndex: true,
        }}
        className="react-sigma"
      >
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />        
        <GraphDataController dataset={dataset} filters={filtersState}/>
        
        <ControlsContainer position={"bottom-right"}>
          <ZoomControl />
          <ForceAtlasControl />
        </ControlsContainer>
        <ControlsContainer position={"top-right"}>
          <SearchControl />
        </ControlsContainer>
      </SigmaContainer>
    </div>
    
  );
};

export default Root;
