import React from "react";
import loadable from "loadable-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WithNavigationMenu from "./layouts/WithNavigationMenu";

const IndexPage = loadable(() => import("./pages/Index/IndexPage"));
const AboutPage = loadable(() => import("./pages/About/AboutPage"));

const PortfolioListPage = loadable(() => import("./pages/Portfolio/PortfolioListPage"));

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

                  <Route path="/portfolio" exact component={PortfolioListPage} />
              </WithNavigationMenu>


          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
