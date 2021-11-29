import React, { FC } from "react";
import { VictoryChart, VictoryBoxPlot, VictoryLegend } from 'victory';
const BoxChart: FC = () => {
    return (
        <VictoryChart domainPadding={15} >
            <VictoryBoxPlot

                labels
                boxWidth={10}
                whiskerWidth={5}
                data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] }
                ]}
            />
        </VictoryChart>
    );
};
export default BoxChart;