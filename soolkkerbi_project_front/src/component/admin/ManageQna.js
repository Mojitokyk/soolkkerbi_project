import "./adminMain.css";
import { Route, Routes } from "react-router-dom";
import ManageQnaList from "./ManageQnaList";
import ManageQnaView from "./ManageQnaView";

const ManageQna = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">1:1문의 관리</div>
      <Routes>
        <Route
          path="manageQnaView"
          element={<ManageQnaView isLogin={isLogin} member={member} />}
        />
        <Route path="*" element={<ManageQnaList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default ManageQna;
