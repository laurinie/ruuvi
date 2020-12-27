import * as React from 'react'
import { useEffect, useState } from 'react'


interface Item {
    humidity: number
    id: string
    name: string
    temperature: number
    updated: string
    voltage: number
}

export default function Temperature() {

    const [latest, setLatest] = useState<Item>()


    useEffect(() => {
        if (!latest) {
            fetch('https://gqeafe8uxg.execute-api.eu-west-1.amazonaws.com/tags', {
                method: 'GET'
            }).then(data => data.json())
                .then(json => setLatest(json.Items[0]))
        }
    }, [latest])

    return (
        <>
            {latest ?
                <div>
                    <h1>{latest.name}</h1>
                    <h2>
                        {latest.temperature}
                    </h2>
                    <i>{new Date(latest.updated).toLocaleString('fi-FI')}</i>


                </div>
                :
                <h1>Ladataan...</h1>
            }
        </>
    )
}