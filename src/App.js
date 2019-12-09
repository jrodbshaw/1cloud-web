import React, { useEffect, useContext } from 'react';
import { Router } from '@reach/router';
// * Context Provider
import { Provider as AuthProvider } from "../src/context/AuthContext";
import { Context as AuthContext } from "../src/context/AuthContext";
// * Styling
import { CssBaseline } from '@material-ui/core';
// * screens
import DashboardScreen from './screens/DashboardScreen';
import Home from './screens/Home';
// import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignupScreen';
import FormikSignin from './screens/FormikSignin';
// import ResolveAuthScreen from './screens/ResolveAuthScreen';
import NotFound from './screens/NotFound'

const App = () => {
  // const { trySignin } = useContext(AuthContext);

  // useEffect(() => {
  //   return trySignin();
  // }, []);

  return (
    <>
      <Router>
        <NotFound default />
        {/* <ResolveAuthScreen path="/" /> */}
        <Home path='/home' />
        <DashboardScreen path='/' />
        {/* <SignInScreen path='/signin' /> */}
        <FormikSignin path='/signin' />
        <SignUpScreen path='/signup' />
      </Router>
    </>
  );
}

export default () => (
  <AuthProvider>
    <CssBaseline />
    <App />
  </AuthProvider>
);

