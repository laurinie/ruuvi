import * as React from 'react'
import { DataContext } from '../context/data';


export default function Humidity() {

    return (
        <DataContext.Consumer>
            {data => data ?
                <div>
                    {/* <h1>{data[0].name}</h1>
                    <h2>
                        {data[0].humidity}%
                    </h2>
                    <i>{new Date(data[0].updated).toLocaleString('fi-FI')}</i> */}
                </div>
                :
                <h1>Ladataan...</h1>
            }
        </DataContext.Consumer>
    )
}