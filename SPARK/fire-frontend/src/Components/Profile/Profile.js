import React from "react";
import Header from "../Home/Header";
import CssBaseline from "@material-ui/core/CssBaseline";

export function Profile() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Header title="FIRE: From Ideas to Reality powered by Generative AI" />

      <img
        width="1500px"
        alt="profile"
        src="https://gmbapi.com/wp-content/uploads/2022/05/GBP-Dashboard-Cover-1.gif"
      />
    </React.Fragment>
  );
}
