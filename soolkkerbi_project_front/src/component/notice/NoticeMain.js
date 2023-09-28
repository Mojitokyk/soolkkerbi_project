import { Route, Routes } from "react-router-dom";
import "./notice.css";
import NoticeList from "./NoticeList";

const NoticeMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  return (
    <div className="notice-all-wrap">
      <div className="notice-title">
        <h2>공지사항</h2>
      </div>
      <Routes>
        <Route path="*" element={<NoticeList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default NoticeMain;
