import React, { useState, useEffect, useContext } from 'react';
import { Link } from "@reach/router";
// * context
import { Context as AuthContext } from "../context/AuthContext";
import { Button, TextField, Grid, Box, Typography, Container, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorSnackbar from '../components/ErrorSnackbar'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '} One Cloud ID {new Date().getFullYear()}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  forgotPassword: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'false'
  },
  signuplink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

}));

export default function SignInScreen() {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("sign in");
  const [loading, setLoading] = useState(false);
  const [useError, setUseError] = useState("")

  const authError = state.errorMessage;

  useEffect(() => {
    authError ? setUseError(authError.message) : setUseError("")
  }, [authError]);

  const handleSignin = () => {
    setLoading(true)
    setButtonText('beaming up....')

    signin(email, password)
  }

  const handleErrorMessage = () => {
    setLoading(false)
    setButtonText('create')
    clearErrorMessage()
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.signinText} >
          One Cloud ID
        </Typography>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            disabled={loading}
            required
            fullWidth
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email Address"
            placeholder="user@mail.com"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            disabled={loading}
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
          <div className={classes.wrapper}>
            <Button
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignin}
            >
              {buttonText}
            </Button>
            {loading && < LinearProgress />}
          </div>
          <Grid container className={classes.forgotPassword}>
            <Grid item xs>
              <Button color="primary" component={Link} to='/' >Forgot password?</Button>
            </Grid>
          </Grid>
          <Grid container className={classes.signuplink}>
            <Grid item>
              <Button color="primary" component={Link} to="/signup">
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {useError && <ErrorSnackbar errorMessage={useError} handleClearError={handleErrorMessage} />}
    </Container >
  );
}
