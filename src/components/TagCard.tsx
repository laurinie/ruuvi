import classes from '*.module.css';
import { Card, CardContent, Typography, Chip, Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { deepOrange, deepPurple, green } from '@material-ui/core/colors';
import { group } from 'console';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { DataPoint } from '../types/dataTypes';

interface Props {
    id: string;
    group: string;
    name: string;
    data?: DataPoint[]
}

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
        chip: {
            fontSize: '1.5rem',
            margin:10
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


function TagCard({ id, group, name, data }: Props) {
    const classes = useStyles();

    return (
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
                        className={classes.chip}
                        avatar={
                            <Avatar className={classes.orange}>°C</Avatar>
                        }
                        label={data && data[0]?.temperature.toPrecision(3) || '-'}
                    />
                    <Chip
                        className={classes.chip}
                        avatar={
                            <Avatar className={classes.purple}>%</Avatar>
                        }
                        label={data && data[0]?.humidity.toPrecision(3) || '-'}
                    />
                    <Chip
                        className={classes.chip}
                        avatar={
                            <Avatar className={classes.green}>V</Avatar>
                        }
                        label={data && data[0]?.voltage.toPrecision(3) || '-'}
                    />
                    <Typography variant="body2" component="p">
                        {data && new Date(data[0]?.updated).toLocaleString() || '-'}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default TagCard;