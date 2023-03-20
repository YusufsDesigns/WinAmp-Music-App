import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./error/PageNotFound";
import Home from "./Home";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='*' exact element={<PageNotFound />} />
      </Routes>
      </Router>
    </>
  )
}

export default App