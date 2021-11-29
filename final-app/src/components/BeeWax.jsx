import { AccurateBeeswarm } from 'accurate-beeswarm-plot';
import React from "react";





function BeeWax() {
        let data = [{ value: 2, name: "A" }, { value: 3, name: "B" }];
        let radius = 5;
        let fn = d => d.value;
        let graph = new AccurateBeeswarm(data, radius, fn)
        .calculateYPositions();
        return (<div>
                {graph}
        </div>
        );
}
export default BeeWax;