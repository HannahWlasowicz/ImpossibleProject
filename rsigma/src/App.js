import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import SigmaExtender from './SigmaExtender';


function App() {

  let myGraph = { nodes: [{ id: "n1", label: "Alice" }, { id: "n2", label: "Rabbit" }], edges: [{ id: "e1", source: "n1", target: "n2", label: "SEES" }] };

  return (
    <div className="App">
      <Sigma style={{ graphWidth: 'inherit', height: '750px' }}
								renderer={"canvas"}
								settings={graphSettings}>
								<SigmaExtender graph={graph}
									graphSettings={graphSettings}
									dispatchEventName={dispatchEventName}
									actionNode={actionNode}
									centrality={centrality}
									highlightCentralityNodesNum={highlightCentralityNodesNum} />
								{this._getGraphLayout(layoutType, graphSettings)}								
								<NodeShapes default={graphSettings.nodeShapes} />
								<EdgeShapes default={graphSettings.edgeShapes} />
							</Sigma>
    </div>
  );
}

export default App;
