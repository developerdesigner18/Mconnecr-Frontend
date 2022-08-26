import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Platform = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/PlatformAdd`}
        component={lazy(() => import(`./PlatformAdd`))}
      />

      <Redirect exact from={`${match.url}`} to={`${match.url}/PlatformAdd`} />
    </Switch>
  </Suspense>
);

export default Platform;
