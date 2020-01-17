import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// * components
import ControlledExpansionPanels from "./ControlledExpansionPanels";

const useStyles = makeStyles(theme => ({
  heading: {}
}));

export default function IndividualCard() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.heading}>Your Account</Typography>
      <ControlledExpansionPanels />
    </>
  );
}
