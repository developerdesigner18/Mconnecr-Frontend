import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Clients = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/ClientsInfo`}
        component={lazy(() => import(`./ClientsInfo`))}
      />
      <Route
        path={`${match.url}/ClientView/:id`}
        component={lazy(() => import(`./ClientView`))}
      />
      <Route
        path={`${match.url}/ClientEdit/:id`}
        component={lazy(() => import(`./ClientEdit`))}
      />
      <Route
        path={`${match.url}/ClientAdd`}
        component={lazy(() => import(`./ClientAdd`))}
      />
      <Redirect exact from={`${match.url}`} to={`${match.url}/ClientsInfo`} />
    </Switch>
  </Suspense>
);

export default Clients;
