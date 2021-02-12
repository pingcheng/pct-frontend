import './App.css';
import IndexPage from "./pages/Index/IndexPage";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

          <IndexPage />

      </BrowserRouter>
    </div>
  );
}

export default App;
