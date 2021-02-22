import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteWrapper } from "./layouts/RouteWrapper";
import WithNavigationMenu from "./layouts/WithNavigationMenu";
import { Loading } from "./components/Loading/Loading";

const IndexPage = pageLoad(() => import("./pages/Index/IndexPage"));
const AboutPage = pageLoad(() => import("./pages/About/AboutPage"));

const PortfolioListPage = pageLoad(() => import("./pages/Portfolio/PortfolioListPage"));
const PortfolioDetailPage = pageLoad(() => import("./pages/Portfolio/PortfolioDetailPage"));

const PostsListPage = pageLoad(() => import("./pages/Posts/PostsListPage"));
const PostDetailPage = pageLoad(() => import("./pages/Posts/PostDetailPage"));

const NotFoundPage = pageLoad(() => import("./pages/Errors/NotFoundPage"));

function pageLoad(callback) {
    return loadable(callback, {
        fallback: <Loading />
    });
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>

          <Switch>
              <Route exact path="/" component={IndexPage} />
              <RouteWrapper exact path="/about" component={AboutPage} layout={WithNavigationMenu} />

              <RouteWrapper exact path="/portfolio" component={PortfolioListPage} layout={WithNavigationMenu} />
              <RouteWrapper path="/portfolio/:slug" component={PortfolioDetailPage} layout={WithNavigationMenu} />

              <RouteWrapper exact path="/posts" component={PostsListPage} layout={WithNavigationMenu} />
              <RouteWrapper path="/posts/:slug" component={PostDetailPage} layout={WithNavigationMenu} />

              <RouteWrapper component={NotFoundPage} layout={WithNavigationMenu} />
          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
