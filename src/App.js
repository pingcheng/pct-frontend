import React from "react";
import loadable from "loadable-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WithNavigationMenu from "./layouts/WithNavigationMenu";

const IndexPage = loadable(() => import("./pages/Index/IndexPage"));
const AboutPage = loadable(() => import("./pages/About/AboutPage"));

const PortfolioListPage = loadable(() => import("./pages/Portfolio/PortfolioListPage"));
const PortfolioDetailPage = loadable(() => import("./pages/Portfolio/PortfolioDetailPage"));

const NotFoundPage = loadable(() => import("./pages/Errors/NotFoundPage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>

          <Switch>

              <Route exact path="/">
                  <IndexPage />
              </Route>

              <WithNavigationMenu>
                  <Route exact path="/about">
                      <AboutPage />
                  </Route>

                  <Route path="/portfolio" exact component={PortfolioListPage} />
                  <Route path="/portfolio/:slug" component={PortfolioDetailPage} />
              </WithNavigationMenu>


          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
