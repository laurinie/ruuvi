import * as React from 'react'
import { DataContext } from '../context/data';

export default function Updated() {

    return (
        <DataContext.Consumer>
            {data => data ?
                <div>
                    <p>Päivitetty: {data.updated}</p>
                </div>
                :
                <h1>Ladataan...</h1>
            }
        </DataContext.Consumer>
    )
}