import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Callback = (props) => {
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }),
    [];
  return (
    <div>
      <h2>Loading....</h2>
    </div>
  );
};

Callback.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Callback;
