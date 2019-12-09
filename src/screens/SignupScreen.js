import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router'
import { Button, TextField, Grid, Box, Typography, Container, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// * context
import { Context as AuthContext } from "../context/AuthContext";
// * components
import ErrorSnackbar from '../components/ErrorSnackbar'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '} 1Cloud ID {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    signinText: {
        marginBottom: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpScreen() {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");
    const [buttonText, setButtonText] = useState("create");
    const [loading, setLoading] = useState(false);
    const [useError, setUseError] = useState("");

    const authError = state.errorMessage;

    useEffect(() => {
        authError ? setUseError(authError.message) : setUseError("")
    }, [authError]);

    const handleSignup = () => {
        setLoading(true)
        setButtonText('attempting to create profile....')
        // * handle validation
        // * check passwordMatch matches
        signup(email, password, passwordMatch)
    }

    const handleErrorMessage = () => {
        setLoading(false)
        setButtonText('Creating ID')
        clearErrorMessage()
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.signinText} >
                    1Cloud ID
                </Typography>
                <Typography component="h1" variant="h5">
                    Create ID
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        placeholder="user@mail.com"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        placeholder="Example123"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        label="Re-type Password"
                        placeholder="Example123"
                        type="password"
                        id="passwordMatch"
                        value={passwordMatch}
                        onChange={e => setPasswordMatch(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignup}
                    >
                        {buttonText}
                    </Button>
                    {loading && < LinearProgress />}
                    <Grid container justify="center">
                        <Grid item>
                            <Button color="primary" component={Link} to='/signin' >Already have an account? Sign in</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            {useError && <ErrorSnackbar errorMessage={useError} handleClearError={handleErrorMessage} />}
        </Container>
    );
}