import React from "react";
import { Typography } from "@material-ui/core";

const Copyright = props => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} One Cloud ID {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
