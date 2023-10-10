import { Route, Routes } from "react-router-dom";
import "./myQna.css";
import MyQnaWrite from "./MyQnaWrite";
import MyQnaView from "./MyQnaView";
import MyQnaList from "./MyQnaList";
import MyQnaModify from "./MyQnaModify";

const MyQna = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">1:1 문의</div>
      <Routes>
        <Route path="qnaWrite" element={<MyQnaWrite isLogin={isLogin} />} />
        <Route
          path="qnaView"
          element={<MyQnaView member={member} isLogin={isLogin} />}
        />
        <Route path="qnaModify" element={<MyQnaModify isLogin={isLogin} />} />
        <Route
          path="*"
          element={<MyQnaList member={member} isLogin={isLogin} />}
        />
      </Routes>
    </div>
  );
};
export default MyQna;
