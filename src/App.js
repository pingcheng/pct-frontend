import React from "react";
import loadable from "loadable-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteWrapper } from "./layouts/RouteWrapper";
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
              <Route exact path="/" component={IndexPage} />
              <RouteWrapper exact path="/about" component={AboutPage} layout={WithNavigationMenu} />
              <RouteWrapper exact path="/portfolio" component={PortfolioListPage} layout={WithNavigationMenu} />
              <RouteWrapper path="/portfolio/:slug" component={PortfolioDetailPage} layout={WithNavigationMenu} />
              <RouteWrapper component={NotFoundPage} layout={WithNavigationMenu} />
          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
