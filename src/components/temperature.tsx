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
    const [refreshInterval, setRefreshInterval] = useState(15000);

    function getData() {

        fetch('https://gqeafe8uxg.execute-api.eu-west-1.amazonaws.com/tags', {
            method: 'GET'
        })
            .then(data => data.json())
            .then(json => {
                const sorted = json.Items.sort(function (a: Item, b: Item) {
                    const at = new Date(a.updated).getTime();
                    const bt = new Date(b.updated).getTime()
                    if(at<bt){
                        return 1
                    }else if (at>bt){
                        return -1
                    }
                    return 0
                    
                })
                console.log(sorted)
                setLatest(sorted[0])
            })
    }


    useEffect(() => {
        if (!latest) {
            getData()
        }
    }, [latest])

    useEffect(() => {
        console.log("tick")
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(getData, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]);
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