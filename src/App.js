import './App.css';
import IndexPage from "./pages/Index/IndexPage";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WithNavigationMenu from "./layouts/WithNavigationMenu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

          <Switch>

              <Route exact path="/">
                  <IndexPage />
              </Route>

              <WithNavigationMenu>

              </WithNavigationMenu>


          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
