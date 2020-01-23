import React, { useState, useRef, useEffect } from "react";
// * context
// import { Context as AuthContext } from "../context/AuthContext";
// * dependencies
import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
  LinearProgress,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// * components
import Copyright from "../components/Copyright";

const states = [
  { value: "ACT" },
  { value: "NSW" },
  { value: "NT" },
  { value: "QLD" },
  { value: "TAS" },
  { value: "VIC" },
  { value: "WA" }
];

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    flexGrow: 1
  },
  gridContainer: {
    marginTop: theme.spacing(6)
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
    .required("Required"),
  licNo: Yup.number().required("Required")
});

const FirstTimeSignin = props => {
  const [buttonText, setButtonText] = useState("sign in");
  const [loading, setLoading] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [usersState, setUsersState] = useState("");

  const classes = useStyles();

  const handleChange = event => {
    setUsersState(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.signinText}>
          One Cloud ID
        </Typography>
        <Typography component="h1" variant="h5">
          Welcome to OneCloud ID
        </Typography>
        <div className={classes.root}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              licNo: "",
              usersState: ""
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
                <Grid className={classes.gridContainer}>
                  <Grid item>
                    <Typography align="left" component="h6" variant="subtitle1">
                      Account Details
                    </Typography>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        variant="outlined"
                        name="firstName"
                        label="Name"
                        // * formik-material-ui starts
                        component={TextField}
                        margin="normal"
                        // * formik-material-ui ends
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        variant="outlined"
                        name="lastName"
                        label="Last Name"
                        // * formik-material-ui starts
                        component={TextField}
                        margin="normal"
                        // * formik-material-ui ends
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <KeyboardDatePicker
                        fullWidth
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="D.O.B"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => handleDateChange(date)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.gridContainer}>
                  <Grid item>
                    <Typography align="left" component="h6" variant="subtitle1">
                      Personal Details
                    </Typography>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        variant="outlined"
                        name="licNo"
                        label="Licence No."
                        type="number"
                        placeholder="1041000"
                        margin="normal"
                        // * formik-material-ui starts
                        component={TextField}
                        // * formik-material-ui ends
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as="select"
                        variant="outlined"
                        name="usersState"
                        label="Select State"
                        component="select"
                      >
                        {states.map(ste => (
                          <option key={ste.value} value={ste.value}>
                            {ste.value}
                          </option>
                        ))}
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

FirstTimeSignin.propTypes = {};

export default FirstTimeSignin;
