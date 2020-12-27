import * as React from 'react'
import { DataContext } from '../context/data';
import { VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';
import styled from 'styled-components';
import { sortByTime } from '../utils';
import { useContext } from 'react';

const ChartContainer = styled.div`
    /* width:300px; */
`;
const chartTheme = {
    axis: {
        style: {
            tickLabels: {
                // this changed the color of my numbers to white
                fill: 'white',

            },
        },
    },
    labels: {
        fontSize: 5
    }
};

export default function Temperature() {

    const data = useContext(DataContext)

    return (
        <>
            {data ?
                <ChartContainer>

                    <VictoryChart
                        width={550}
                        height={300}
                        scale={{ x: "time" }}
                        theme={chartTheme}
                        containerComponent={
                            <VictoryZoomContainer 
                                zoomDimension="x"
                            />
                        }
                    >
                        <VictoryLine
                            width={600}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            style={{
                                data: {
                                    stroke: "#c43a31",
                                    strokeWidth: 1,

                                },
                            }}
                            data={sortByTime(data.dataPoints, 'asc').map(d => ({ x: new Date(d.updated), y: d.temperature }))}

                        />
                    </VictoryChart>
                </ChartContainer>
                :
                <h1>Ladataan...</h1>
            }
        </>
    )
}