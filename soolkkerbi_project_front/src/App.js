import "./App.css";
import { Route, Routes ,Switch} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./component/common/Header";
import MypageMain from "./component/mypage/MypageMain";
import ProductMain from "./component/product/ProductMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import Footer from "./component/common/Footer";
import About from "./component/mainpage/About";
import AdminMain from "./component/admin/AdminMain";
import Main from "./component/mainpage/Main";
import Direction from "./component/mainpage/Direction";
import NoticeMain from "./component/notice/NoticeMain";
import Cart from "./component/product/Cart";


function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [num, setNum] = useState(0);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [num]);
  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/direction" element={<Direction />} />
          <Route
            path="/notice/*"
            element={<NoticeMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage/*" element={<MypageMain />} />
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/product/*"
            element={<ProductMain isLogin={isLogin} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
