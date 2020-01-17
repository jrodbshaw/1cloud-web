import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AccountDetailsSchema = Yup.object().shape({
  name: Yup.string(),
  dob: Yup.date(),
  contactDetails: Yup.string().email("Invalid email")
});

const AccountDetailsForm = () => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          dob: "",
          contactDetails: ""
        }}
        validationSchema={AccountDetailsSchema}
        onSubmit={values => {
          setLoading(true);
          setButtonText("beaming up....");
          // * add C.R.U.D functionality function here, should update firestore also
        }}
      >
        {({ errors, touched }) => (
          <Form className={classes.form} noValidate>
            <Field
              variant="outlined"
              name="name"
              label="Name"
              type="name"
              // * formik-material-ui starts
              component={TextField}
              margin="normal"
              fullWidth
              autoComplete="name"
              autoFocus
              // * formik-material-ui ends
            />
            <Field
              variant="outlined"
              name="dob"
              label="DOB"
              type="dob"
              // * formik-material-ui starts
              component={TextField}
              margin="normal"
              fullWidth
              autoComplete="current-password"
              // * formik-material-ui ends
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
            <Grid container className={classes.forgotPassword}>
              <Grid item xs>
                <Button color="primary" onClick={handleOpen}>
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
            <Grid container className={classes.signuplink}>
              <Grid item>
                <Button color="primary" component={Link} to="/signup">
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountDetailsForm;
