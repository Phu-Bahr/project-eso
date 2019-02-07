import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import CategoryContainer from "../../containers/CategoryContainer";

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
