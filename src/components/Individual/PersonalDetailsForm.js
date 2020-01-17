import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Button
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

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
  }
}));

const PersonalDetails = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Personal</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography>Name: 'link user name here'</Typography>
          <Typography>D.O.B: 'link user dob here'</Typography>
          <Typography>Contact Details: 'link user emails here'</Typography>

          <Button color="primary">Edit</Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default PersonalDetails;
