import React from 'react';
import Submit from "./components/submit/Submit";
import Admin from "./components/admin/Admin";
import View from "./components/view/View";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
                <Submit/>
            </Route>
            <Route path="/view">
              <View/>
            </Route>
            <Route path="/admin">
              <Admin/>
            </Route>
          </Switch>
        </div>
      </Router>




  );
}

export default App;
