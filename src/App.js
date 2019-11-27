import React from 'react';
import { Router } from '@reach/router';
// * Context Provider
import { Provider as AuthProvider } from "../src/context/AuthContext";
import { CssBaseline } from '@material-ui/core';
// * screens
import DashboardScreen from './screens/DashboardScreen';
import Home from './screens/Home';
import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignupScreen';
import ResolveAuthScreen from './screens/ResolveAuthScreen';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <ResolveAuthScreen path="/" />
        <Home path='/home' />
        <DashboardScreen path='/dashboard' />
        <SignInScreen path='/signin' />
        <SignUpScreen path='/signup' />
      </Router>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

