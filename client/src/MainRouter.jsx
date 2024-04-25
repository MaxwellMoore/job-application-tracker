import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import { Login, Register } from "./auth/components";

function MainRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default MainRouter;
