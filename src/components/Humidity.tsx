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

interface Props {
    name:string;
}

export default function Humidity({name}:Props) {

    const data = useContext(DataContext)

    return (
        <>
            {data ?
                <ChartContainer>
                    <ResponsiveContainer>
                        <AreaChart
                            data={sortByTime(data.dataPoints, 'asc').filter(d=>d.name === name).map(d => ({
                                updated: new Date(d.updated).toLocaleString('fi-Fi'),
                                humidity: d.humidity
                            }))}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <XAxis dataKey="updated" type={'category'} />
                            <YAxis dataKey='humidity' domain={['dataMin', 'dataMax']} />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="humidity" stroke="#eeeeee" fill='#1ecafa' yAxisId={0} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
                :
                <h1>Ladataan...</h1>
            }
        </>
    )
}