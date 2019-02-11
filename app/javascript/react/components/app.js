import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import CategoryContainer from "../../containers/CategoryContainer";
import UserContainer from "../../containers/UserContainer";

export const App = props => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route
          path="/"
          onChange={(prevState, nextState) => {
            if (nextState.location.action !== "POP") {
              window.scrollTo(0, 0);
            }
          }}
        >
          <IndexRoute component={CategoryContainer} />
          <Route path="/restaurants" component={UserContainer} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
