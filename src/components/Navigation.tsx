import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%'
    },
});

export const routes = [
    "",
    "ryhmat"
]

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState(routes.indexOf(history.location.pathname.replace("/","")));

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                history.push(`/${routes[newValue]}`)
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Etusivu" icon={<HomeIcon />} />
            {/* <BottomNavigationAction label="Hallinta" icon={<SettingsIcon />} /> */}
            <BottomNavigationAction label="Ryhmät" icon={<GroupIcon />} />
        </BottomNavigation>
    );
}

