import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import LoginPage from "./views/Login";
import Home from "./views/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
