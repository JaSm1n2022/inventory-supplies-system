import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
    color: "white",
    fontSize: "13px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
  text: {
    color: theme.palette.primary,
    fontSize: "13px",
  },
  secondary: {
    backgroundColor: theme.palette.secondary,
    color: "darkGray",
    fontSize: "13px",
    boxShadow: "none",
  },
  default: {
    backgroundColor: "darkGray",
    color: "darkGray",
    fontSize: "13px",
    boxShadow: "none",
  },
}));

const DefaultButton = ({ action, type, children, ...props }) => {
  const classes = useStyles();

  const classFromType = () => {
    switch (type) {
      case "primary":
        return classes.root;
      case "secondary":
        return classes.secondary;
        case "default":
          return classes.default;
      case "text":
        return classes.text;
      default:
        return classes.primary;
    }
  };

  const variantFromType = () => {
    switch (type) {
      case ("primary", "secondary","default"):
        return "contained";
      case "text":
        return "text";
      default:
        return "contained";
    }
  };

  const colorFromType = () => {
    switch (type) {
      case ("primary", "text"):
        return "primary";
      case "secondary":
        return "secondary";
      case "default" : 
      return "secondary";  
      default:
        return "primary";
    }
  };

  return (
    <Button
      color={colorFromType()}
      {...props}
      className={classFromType()}
      variant={variantFromType()}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
