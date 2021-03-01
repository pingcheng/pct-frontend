import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./PageRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <PageRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
