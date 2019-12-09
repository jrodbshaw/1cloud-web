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
import SignUpScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import NotFound from './screens/NotFound'

const App = () => {
  const { trySignin } = useContext(AuthContext);

  // * sort out the onAuthStateChange with firebase to check on load for a current user...
  useEffect(() => {
    return trySignin()
  }, [])

  return (
    <>
      <Router>
        <NotFound default />
        <Home path='/home' />
        <DashboardScreen path='/' />
        <SigninScreen path='/signin' />
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

