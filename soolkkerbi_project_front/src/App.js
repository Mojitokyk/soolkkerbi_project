import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./component/common/Header";
import MypageMain from "./component/mypage/MypageMain";
import ProductMain from "./component/product/ProductMain";

import Join from "./component/member/Join";
import Login from "./component/member/Login";

import Footer from "./component/common/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />

      <div className="content">
        <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
          <Route path="/mypage/*" element={<MypageMain />} />
          <Route path="/product/*" element={<ProductMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
