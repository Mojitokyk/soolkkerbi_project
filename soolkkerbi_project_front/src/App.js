import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./component/common/Header";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="content"></div>
    </div>
  );
}

export default App;
