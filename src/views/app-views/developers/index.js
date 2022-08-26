import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Developers = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/DevelopersAdd`}
        component={lazy(() => import(`./DevelopersAdd`))}
      />

      <Redirect exact from={`${match.url}`} to={`${match.url}/DevelopersAdd`} />
    </Switch>
  </Suspense>
);

export default Developers;
