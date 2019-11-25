import React from 'react';
import { Router } from '@reach/router';
import { CssBaseline } from '@material-ui/core';
// * screens
import DashboardScreen from './screens/DashboardScreen';
import Home from './screens/Home';
import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignupScreen';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Home path='/' />
        <DashboardScreen path='/dashboard' />
        <SignInScreen path='/signin' />
        <SignUpScreen path='/signup' />
        {/* <Container maxWidth="sm">
        <Typography component="div" className={classes.root}>OneCloud ID</Typography>
      </Container> */}
      </Router>
    </>
  );
}

export default () => (
  <App />
)

