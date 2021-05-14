import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
    "hallinta"
]

export default function Navigation() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(routes.indexOf(history.location.pathname.replace("/","")));

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
            <BottomNavigationAction label="Hallinta" icon={<SettingsIcon />} />
            {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
        </BottomNavigation>
    );
}
