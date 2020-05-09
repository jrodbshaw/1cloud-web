import React, { useEffect, useContext } from "react";
import { Router } from "@reach/router";
// * Providers
import { Provider as AuthProvider } from "../src/context/AuthContext";
import { Context as AuthContext } from "../src/context/AuthContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// * Styling
import { CssBaseline } from "@material-ui/core";
// * screens
import Home from "./screens/Home";
import SignUpScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FirstTimeSignin from "./screens/FirstTimeSignin";
import NotFound from "./screens/NotFound";

const App = () => {
  const { trySignin } = useContext(AuthContext);

  useEffect(() => {
    return trySignin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <NotFound default />
        <Home path="/home" />
        <DashboardScreen path="/" />
        <FirstTimeSignin path="/firsttime" />
        <SigninScreen path="/signin" />
        <SignUpScreen path="/signup" />
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default () => (
  <AuthProvider>
    <CssBaseline />
    <App />
  </AuthProvider>
);
