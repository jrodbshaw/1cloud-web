import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
// * context
import { Context as AuthContext } from "../context/AuthContext";
// * dependencies
import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
  LinearProgress,
  Modal,
  CircularProgress,
  TextField as MUITextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
// * components
import Copyright from "../components/Copyright";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  signinText: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  forgotPassword: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "false"
  },
  signuplink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  modalPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const FirstTimeSigninSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const FirstTimeSignin = props => {
  const { state, signin } = useContext(AuthContext);
  const authError = state.errorMessage;
  const [buttonText, setButtonText] = useState("sign in");
  const [loading, setLoading] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.signinText}>
          One Cloud ID
        </Typography>
        <Typography component="h1" variant="h5">
          Welcome to OneCloud ID
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: ""
          }}
          validationSchema={FirstTimeSigninSchema}
          onSubmit={values => {
            setLoading(true);
            setButtonText("beaming up....");
            //userProfile(values.firstName, values.lastName); //create user profile with values
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <div className={classes.wrapper}>
                <Field
                  variant="outlined"
                  name="name"
                  label="Name"
                  // * formik-material-ui starts
                  component={TextField}
                  margin="normal"
                  // * formik-material-ui ends
                />
                <Field
                  variant="outlined"
                  name="lastName"
                  label="Last Name"
                  // * formik-material-ui starts
                  component={TextField}
                  margin="normal"
                  // * formik-material-ui ends
                />
              </div>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="D.O.B"
                format="dd/MM/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleDateChange(date)}
              />
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  type="submit"
                >
                  {buttonText}
                </Button>
                {loading && <LinearProgress />}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

FirstTimeSignin.propTypes = {};

export default FirstTimeSignin;
