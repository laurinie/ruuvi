import * as React from 'react';
import { useEffect, useState } from 'react';
import { apiGetData, apiGetTags } from '../api/data';
import { DataPoint, Tag } from '../types/dataTypes';
import { Line } from 'react-chartjs-2';
import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

function TagPage({ match }: any) {

    const [dataPoints, setDataPoints] = useState<DataPoint[]>()
    const [tagDetails, setTagDetails] = useState<Tag>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const tagId = match.params.id

    const tempState = {
        labels: dataPoints?.map(({ updated }) => new Date(updated).toLocaleString()),
        datasets: [
            {
                label: 'Lämpötila',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: '#00c3ff',
                borderWidth: 2,
                data: dataPoints?.map(({ temperature }) => temperature)
            }
        ]
    }

    const humState = {
        labels: dataPoints?.map(({ updated }) => new Date(updated).toLocaleString()),
        datasets: [
            {
                label: 'Kosteus',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#c0b44b',
                borderColor: '#d0ff00',
                borderWidth: 2,
                data: dataPoints?.map(({ humidity }) => humidity)
            }
        ]
    }

    const voltState = {
        labels: dataPoints?.map(({ updated }) => new Date(updated).toLocaleString()),
        datasets: [
            {
                label: 'Jännite',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#b24bc0',
                borderColor: '#cc00ff',
                borderWidth: 2,
                data: dataPoints?.map(({ voltage }) => voltage)
            }
        ]
    }

    function fetchTagDataById(id: string) {
        setIsLoading(true)
        return apiGetData(id).then(data => {
            setDataPoints(data.Items)
        }).finally(()=>setIsLoading(false))
    }

    function fetchTags() {
        apiGetTags().then((data) => {
            setTagDetails(data.find(({ id }) => id === tagId))
        })
    }

    useEffect(() => {
        fetchTagDataById(tagId)
        fetchTags()
    }, [])

    return (
        <>
            <IconButton aria-label="refresh" onClick={() => fetchTagDataById(tagId)}>
                {isLoading ?
                    <CircularProgress /> :
                    <RefreshIcon />
                }
            </IconButton>
            <Typography variant='h3'>{tagDetails?.name}</Typography>
            <Typography variant='caption'>{tagDetails?.group}</Typography>
            <Line
                data={tempState}
                type={'line'}
                options={{
                    title: {
                        display: true,
                        text: 'Lämpötila',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <Line
                data={humState}
                type={'line'}
                options={{
                    title: {
                        display: true,
                        text: 'Kosteus',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <Line
                data={voltState}
                type={'line'}
                options={{
                    title: {
                        display: true,
                        text: 'Jännite',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </>
    )
}

export default TagPage;