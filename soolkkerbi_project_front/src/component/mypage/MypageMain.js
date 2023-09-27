import { useState } from "react";
import "./mypageMain.css";
import { Link, Route, Routes } from "react-router-dom";
import MyOrder from "./MyOrder";
import MyReservation from "./MyReservation";
import MyWishList from "./MyWishList";
import MyReivew from "./MyReview";
import MyQna from "./MyQua";
import MyInfo from "./MyInfo";
import Quit from "./Quit";

const MypageMain = () => {
  const [menus, setMenus] = useState([
    { url: "order", text: "주문 내역", active: false },
    { url: "reservation", text: "예약 내역", active: false },
    { url: "wish", text: "관심 상품", active: false },
    { url: "review", text: "작성한 후기", active: false },
    { url: "qna", text: "1:1 문의", active: false },
    { url: "info", text: "정보 수정", active: false },
    { url: "quit", text: "회원 탈퇴", active: false },
  ]);
  return (
    <div className="mypage-wrap">
      <div className="mypage-title">마이페이지</div>
      <div className="mypage-content">
        <MySideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="order" element={<MyOrder />} />
            <Route path="reservation" element={<MyReservation />} />
            <Route path="wish" element={<MyWishList />} />
            <Route path="review" element={<MyReivew />} />
            <Route path="qna" element={<MyQna />} />
            <Route path="info" element={<MyInfo />} />
            <Route path="quit" element={<Quit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
const MySideMenu = (props) => {
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
    <div className="my-side">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"menu" + index}>
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
export default MypageMain;
