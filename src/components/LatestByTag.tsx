import * as React from 'react'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/data';
import { DataPoint } from '../types/dataTypes';
import { batteryLevel } from '../utils';

interface Props {
    name: string
}

export default function LatestByTag({ name }: Props) {

    const data = useContext(DataContext)

    const [location, setLocation] = useState<DataPoint[]>()

    useEffect(() => {
        setLocation(data?.dataPoints?.filter(d => d.name === name))
    }, [data])

    return (
        <>
            {location ?
                <div>
                    <h1>{location[0].name}</h1>
                    <h2>
                        {location[0].temperature}°C
                    </h2>
                    <h2>
                        {location[0].humidity}%
                    </h2>
                    <code>Varaus {batteryLevel(location[0].voltage)}</code>
                    <p>{new Date(location[0].updated).toLocaleString('fi-FI')}</p>
                </div>
                :
                <h1>Ladataan...</h1>
            }
        </>
    )
}