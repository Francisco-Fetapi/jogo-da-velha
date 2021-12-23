import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "../Styles";

function Header({ jogAtual }) {
  const classes = useStyles();
  return (
    <Box className={`${classes.logo} logo`}>
      <Box className={`bloco bloco-${jogAtual}`}></Box>
    </Box>
  );
}

export default Header;
