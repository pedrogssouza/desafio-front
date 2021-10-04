import React, { useContext } from "react";
import { LoadingContext } from "../../contexts/loadingContext";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function LoadingComponent() {
  const classes = useStyles();
  const { loading } = useContext(LoadingContext);
  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return <></>;
  }
}
