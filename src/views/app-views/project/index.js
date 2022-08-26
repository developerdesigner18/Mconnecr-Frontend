import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Project = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/ProjectsInfo`}
        component={lazy(() => import(`./ProjectsInfo`))}
      />
      <Route
        path={`${match.url}/ProjectAdd`}
        component={lazy(() => import(`./ProjectAdd`))}
      />
      <Redirect exact from={`${match.url}`} to={`${match.url}/ProjectsInfo`} />
    </Switch>
  </Suspense>
);

export default Project;
