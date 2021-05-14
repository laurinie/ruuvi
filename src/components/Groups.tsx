import * as React from 'react';
import { Avatar, Button, Card, CardContent, Chip, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TagIcon from '@material-ui/icons/LocalOffer';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect, useState } from 'react';
import { apiAddTag, apiGetData, apiGetTags } from '../api/data';
import { DataPoint, Tag } from '../types/dataTypes';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        list: {
            width: '100%'
        },
        link: {
            textDecoration: 'none',
            width: '100%'
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
    }),
);

interface Props {
    enableSave?: boolean
}

function Groups({ enableSave }: Props) {
    const classes = useStyles();
    const [tags, setTags] = useState<Tag[]>()
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [groups, setGroups] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function fetchTags() {
        setIsLoading(true)
        apiGetTags().then((data) => {
            const grouped = groupBy(data, "group")
            console.log(grouped)
            let listOfGroups = []
            for (const g in grouped) {

                listOfGroups.push({ name: g, data: grouped[g] })
            }
            setGroups(listOfGroups)
        }).finally(() => setIsLoading(false))
    }

    const groupBy = (items: any, key: any) => items.reduce(
        (result: any, item: any) => ({
            ...result,
            [item[key]]: [
                ...(result[item[key]] || []),
                item,
            ],
        }),
        {},
    );

    useEffect(() => {
        fetchTags()
    }, [])
    console.log(groups)

    return (
        <>
            <IconButton aria-label="refresh" onClick={fetchTags}>
                {isLoading ?
                    <CircularProgress /> :
                    <RefreshIcon />
                }
            </IconButton>

            <List className={classes.list}>
                {groups?.map(({ name, data }: any) => (
                    <ListItem key={name}>
                        <Link to={`/ryhma/${name}`} className={classes.link}>
                            <Card >
                                <CardContent>
                                    <Typography variant='h5'>
                                        {name}
                                    </Typography>
                                    {data.map((d: DataPoint) =>
                                        <Chip label={d.name} />
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Groups;