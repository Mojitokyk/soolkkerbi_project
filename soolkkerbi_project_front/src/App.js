import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import MypageMain from "./component/mypage/MypageMain";

function App() {
  return (
    <div className="wrap">
      <div className="content">
        <Routes>
          <Route path="/mypage/*" element={<MypageMain />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
