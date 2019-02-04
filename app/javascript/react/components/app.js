import React from "react";
import CategoryContainer from "../../containers/CategoryContainer";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

export const App = props => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={CategoryContainer} />
      </Router>
    </div>
  );
};

export default App;
