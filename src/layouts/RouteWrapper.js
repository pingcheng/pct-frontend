import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
};
