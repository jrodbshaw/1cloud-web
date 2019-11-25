import React from 'react';
import { Link } from "@reach/router";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.signinText} >
                    One Cloud ID
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    component={Link}
                    to="/dashboard"
                >
                    Dashboard
                    </Button>
            </div>
        </Container>
    )
}

export default Home
