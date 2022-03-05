import { Route } from "react-router-dom";
import React from "react";
import { RouteProps } from "react-router";

export type RouteWrapperProps = {
  component: React.ElementType;
  layout: React.ElementType;
} & RouteProps;

export function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}: RouteWrapperProps): JSX.Element {
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
