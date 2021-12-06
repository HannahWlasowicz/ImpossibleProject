import { AccurateBeeswarm } from 'accurate-beeswarm-plot';
import React from "react";

// let data = [{value: 2, name: "A"}, {value: 3, name: "B"}];
// let radius = 5;
// let fn = d => d.value;
// let result = new AccurateBeeswarm(data, radius, fn)
//         .calculateYPositions();
//   return result;
function BeeWax() {
        let data = [{ value: 2, name: "A" }, { value: 3, name: "B" }];
        let radius = 5;
        let fn = d => d.value;
        let graph = new AccurateBeeswarm(data, radius, fn)
        .calculateYPositions();
        return (<svg>
               <ForceGraph
            nodes={graph}
          />
        </svg>
        );
}
export default BeeWax;