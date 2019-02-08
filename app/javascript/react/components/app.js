import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import CategoryContainer from "../../containers/CategoryContainer";
import UserContainer from "../../containers/UserContainer";

export const App = props => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={CategoryContainer} />
        <Route path="/restaurants" component={UserContainer} />
      </Router>
    </div>
  );
};

export default App;
