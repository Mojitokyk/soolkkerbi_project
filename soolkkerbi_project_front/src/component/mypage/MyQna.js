import { Route, Routes } from "react-router-dom";
import "./myQna.css";
import MyQnaWrite from "./MyQnaWrite";
import MyQnaView from "./MyQnaView";
import MyQnaList from "./MyQnaList";
import MyQnaModify from "./MyQnaModify";

const MyQna = () => {
  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">1:1 문의</div>
      <Routes>
        <Route path="qnaWrite" element={<MyQnaWrite />} />
        <Route path="qnaView" element={<MyQnaView />} />
        <Route path="qnaModify" element={<MyQnaModify />} />
        <Route path="*" element={<MyQnaList />} />
      </Routes>
    </div>
  );
};
export default MyQna;
