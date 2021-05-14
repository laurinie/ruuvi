import * as React from 'react';
import { Avatar, Button, Chip, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TagIcon from '@material-ui/icons/LocalOffer';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect, useState } from 'react';
import { apiAddTag, apiGetData, apiGetTags } from '../api/data';
import { DataPoint, Tag } from '../types/dataTypes';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        avatar: {
            marginRight: 10
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
    }),
);

interface Props {
    enableSave?: boolean
}

function Tags({ enableSave }: Props) {
    const classes = useStyles();
    const [tags, setTags] = useState<Tag[]>()
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [group, setGroup] = useState<string>("")
    const [tagData, setTagData] = useState<Map<string, DataPoint>>(new Map)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    function handelSave() {
        setIsLoading(true)
        apiAddTag({ id, name, group }).then(() => {
            fetchTags()
        }).finally(() => setIsLoading(false))
    }
    function fetchTags() {
        setIsLoading(true)
        apiGetTags().then((data) => {
            let tagsAndData = data
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

            <List>
                {tags?.map(({ name, id, group, data }) => (
                    <ListItem key={id}>
                        <ListItemAvatar className={classes.avatar}>
                            <Chip
                                avatar={
                                    <Avatar className={classes.orange}>°C</Avatar>
                                }
                                label={data && data[0]?.temperature || '-'}
                                variant="outlined"
                            />
                        </ListItemAvatar>
                        <ListItemText primary={name} secondary={`${id} - ${group}`} />
                    </ListItem>
                ))}
            </List>

            {enableSave &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 300,
                    gap: 15
                }}>
                    <TextField id="name" label="Nimi" variant="outlined" value={name} onChange={({ target }) => setName(target.value)} />
                    <TextField id="id" label="ID" variant="outlined" value={id} onChange={({ target }) => setId(target.value)} />
                    <TextField id="group" label="Ryhmä" variant="outlined" value={group} onChange={({ target }) => setGroup(target.value)} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={handelSave}
                    >
                        Tallenna
                </Button>
                </div>
            }
        </>
    )
}

export default Tags;