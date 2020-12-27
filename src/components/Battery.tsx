import * as React from 'react'
import { DataContext } from '../context/data';
import styled from 'styled-components';
import { sortByTime } from '../utils';
import { useContext } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer,
} from 'recharts';

const ChartContainer = styled.div`
    width:100%;
    height:200px;
    display: flex;
    justify-content: center;
`;

export default function Battery() {

    const data = useContext(DataContext)

    return (
        <>
            {data ?
                <ChartContainer>
                    <ResponsiveContainer>
                        <AreaChart
                            data={sortByTime(data.dataPoints, 'asc').map(d => ({
                                updated: new Date(d.updated).toLocaleString('fi-Fi'),
                                voltage: d.voltage
                            }))}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <XAxis dataKey="updated" type={'category'} />
                            <YAxis dataKey='voltage' domain={[2, 3.2]} />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="voltage" stroke="#e2e2e2" fill='#1efa9b' yAxisId={0} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
                :
                <h1>Ladataan...</h1>
            }
        </>
    )
}