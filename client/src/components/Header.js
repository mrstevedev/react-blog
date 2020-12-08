import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import skyline from "../../public/skyline.jpg";
import { Link } from "react-router-dom";
import Search from "./Search";
import MenuToggle from './MenuToggle';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000",
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          background: "transparent",
          width: "100%",
          height: "40px",
          display: "flex",
          padding: "3rem",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Search />
        <MenuToggle />
      </div>
    </Fragment>
  );
}

export default Header;
