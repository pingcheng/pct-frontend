import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./PageRouter";
import "injections/Sentry";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
