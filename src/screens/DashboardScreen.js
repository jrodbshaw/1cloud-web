import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Tabs, Tab, Typography, Box, } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import IndividualCard from '../components/IndividualCard';
import CompanyCard from '../components/CompanyCard';
import ProjectCard from '../components/ProjectCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
    },
    cloud: {
        alignSelf: 'center',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    signoutLink: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar} >
                <div className={classes.div} >
                    <CloudIcon color='inherit' fontSize="large" className={classes.cloud} />
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Individual" {...a11yProps(0)} />
                        <Tab label="Company" {...a11yProps(1)} />
                        <Tab label="Projects" {...a11yProps(2)} />
                    </Tabs>
                </div>

                <Button
                    className={classes.signoutLink}
                    variant='outlined'
                    color='inherit'
                    component={Link}
                    to="/signin"
                >
                    sign out
                </Button>
            </AppBar>
            <TabPanel value={value} index={0}>
                <IndividualCard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CompanyCard />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProjectCard />
            </TabPanel>
        </div>
    );
}