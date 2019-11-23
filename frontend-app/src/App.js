import React from 'react';
import Submit from "./components/submit/Submit";
import Admin from "./components/admin/Admin";

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
              {/* COMPONENTE DE TV */}
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
