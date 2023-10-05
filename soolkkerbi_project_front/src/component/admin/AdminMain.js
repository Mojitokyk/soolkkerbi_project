import { useState } from "react";
import "./adminMain.css";
import { Link, Route, Routes } from "react-router-dom";
import MyInfo from "../mypage/MyInfo";
import ReadAllMember from "./ReadAllMember";
import ManageStock from "./ManageStock";
import CancelPay from "./CancelPay";
import ProductWrite from "../product/ProductWrite";
import CancelReservation from "./CancelReservation";
import ReadIncome from "./ReadIncome";
import ManageReceive from "./ManageReceive";

const AdminMain = () => {
  const [member, setMember] = useState({});

  const [menus, setMenus] = useState([
    { url: "info", text: "회원정보 수정", active: true },
    { url: "readAllMember", text: "전체회원 조회", active: false },
    { url: "insertProduct", text: "상품 등록", active: false },
    { url: "manageStock", text: "상품재고 관리", active: false },
    { url: "manageReceive", text: "상품수령 관리", active: false },
    { url: "cancelPay", text: "결제취소 관리", active: false },
    { url: "cancelReservation", text: "예약취소 관리", active: false },
    { url: "manageQna", text: "1:1문의 관리", active: false },
    { url: "manageReview", text: "상품후기 관리", active: false },
    { url: "readIncome", text: "매출현황 조회", active: false },
  ]);

  return (
    <div className="admin-wrap">
      <div className="admin-title">관리자페이지</div>
      <div className="admin-content">
        <AdminSideMenu menus={menus} setMenus={setMenus} />
        <div className="admin-menu-content">
          <Routes>
            <Route
              path="info"
              element={<MyInfo member={member} setMember={setMember} />}
            />
            <Route path="readAllMember" element={<ReadAllMember />} />
            <Route path="insertProduct" element={<ProductWrite />}></Route>
            <Route path="manageStock" element={<ManageStock />} />
            <Route path="manageReceive" element={<ManageReceive />} />
            <Route path="cancelPay" element={<CancelPay />} />
            <Route path="cancelReservation" element={<CancelReservation />} />
            <Route path="readIncome" element={<ReadIncome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminSideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;

  const activeTab = (index) => {
    menus.forEach((item) => {
      item.active = false;
    });
    menus[index].active = true;
    setMenus([...menus]);
  };

  return (
    <div className="admin-side">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"adminMenu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              ) : (
                <Link
                  to={menu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminMain;
