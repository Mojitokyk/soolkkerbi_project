import "./adminMain.css";
import { Route, Routes } from "react-router-dom";
import ManageQnaList from "./ManageQnaList";

const ManageQna = () => {
  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">1:1문의 관리</div>
      <Routes>
        <Route path="*" element={<ManageQnaList />} />
      </Routes>
    </div>
  );
};

export default ManageQna;
