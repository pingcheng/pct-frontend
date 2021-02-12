import IndexPage from "./pages/Index/IndexPage";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WithNavigationMenu from "./layouts/WithNavigationMenu";
import AboutPage from "./pages/About/AboutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

          <Switch>

              <Route exact path="/">
                  <IndexPage />
              </Route>

              <WithNavigationMenu>
                  <Route path="/about">
                      <AboutPage />
                  </Route>
              </WithNavigationMenu>


          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
