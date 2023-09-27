import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./component/common/Header";
import MypageMain from "./component/mypage/MypageMain";
import ProductMain from "./component/product/ProductMain";
import Footer from "./component/common/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />

      <div className="content">
        <Routes>
          <Route path="/mypage/*" element={<MypageMain />} />
          <Route path="/product/*" element={<ProductMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
