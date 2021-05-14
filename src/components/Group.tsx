import * as React from 'react';
import { Avatar, Button, Card, CardContent, Chip, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TagIcon from '@material-ui/icons/LocalOffer';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect, useState } from 'react';
import { apiAddTag, apiGetData, apiGetTags } from '../api/data';
import { DataPoint, Tag } from '../types/dataTypes';
import { deepOrange, deepPurple, green } from '@material-ui/core/colors';
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
        green: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
        },
    }),
);


function Group({ match }: any) {
    const classes = useStyles();
    const [tags, setTags] = useState<Tag[]>()
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [group, setGroup] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const groupName = match.params.name

    function fetchTags() {
        setIsLoading(true)
        apiGetTags().then((data) => {
            let tagsAndData = data.filter(({ group }) => group === groupName)
            Promise.all(tagsAndData.map(async (tag) => {
                await fetchTagDataById(tag.id).then((latest) => {
                    tag.data = [latest]
                })
            })).then(() => setTags(tagsAndData))
        }).finally(() => setIsLoading(false))
    }

    async function fetchTagDataById(id: string): Promise<DataPoint> {

        return apiGetData(id).then(data => {
            return data.Items.pop()
        })
    }

    useEffect(() => {
        fetchTags()
    }, [])


    return (
        <>
            <IconButton aria-label="refresh" onClick={fetchTags}>
                {isLoading ?
                    <CircularProgress /> :
                    <RefreshIcon />
                }
            </IconButton>
            <Typography variant='h2'>{groupName}</Typography>
            <List className={classes.list}>
                {tags?.map(({ name, id, group, data }) => (
                    <ListItem key={id}>
                        <Link to={`/tag/${id}`} className={classes.link}>
                            <Card >
                                <CardContent>
                                    <Typography color="textSecondary">
                                        {`${id} - ${group}`}
                                    </Typography>
                                    <Typography variant='h5'>
                                        {name}
                                    </Typography>
                                    <Chip
                                        avatar={
                                            <Avatar className={classes.orange}>°C</Avatar>
                                        }
                                        label={data && data[0]?.temperature.toPrecision(3) || '-'}
                                        variant="outlined"
                                    />
                                    <Chip
                                        avatar={
                                            <Avatar className={classes.purple}>%</Avatar>
                                        }
                                        label={data && data[0]?.humidity.toPrecision(3) || '-'}
                                        variant="outlined"
                                    />
                                    <Chip
                                        avatar={
                                            <Avatar className={classes.green}>V</Avatar>
                                        }
                                        label={data && data[0]?.voltage.toPrecision(3) || '-'}
                                        variant="outlined"
                                    />
                                    <Typography variant="body2" component="p">
                                        {data && new Date(data[0]?.updated).toLocaleString() || '-'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Group;