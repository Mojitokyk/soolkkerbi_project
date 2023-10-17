import { useEffect, useState } from "react";
import "./mypageMain.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyOrder from "./MyOrder";
import MyReservation from "./MyReservation";
import MyWishList from "./MyWishList";
import MyReivew from "./MyReview";
import MyQna from "./MyQna";
import MyInfo from "./MyInfo";
import Quit from "./Quit";
import axios from "axios";
import Swal from "sweetalert2";
import MemberChangePw from "./MemberChangePw";

const MypageMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");

  //회원 불러오기
  const [member, setMember] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setMember(res.data);
        //console.log(res.data.memberLevel);
        //document.querySelectorAll(".my-side a")[0].click();
        //관리자페이지에서 회원비번변경요청시 바로 비번변경페이지로이동하기위함!!
        if (res.data.memberLevel === 2) {
          document.querySelectorAll(".my-side a")[0].click();
        }
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire({
            title: "로그인이 필요한 서비스입니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/login");
          });
        }
      });
  }, [isLogin]);

  const [menus, setMenus] = useState([
    { url: "order", text: "주문 내역", active: true },
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
          <FirstPage member={member} />
          <Routes>
            <Route
              path="order"
              element={<MyOrder member={member} isLogin={isLogin} />}
            />
            <Route
              path="reservation"
              element={<MyReservation member={member} isLogin={isLogin} />}
            />
            <Route
              path="wish"
              element={<MyWishList isLogin={isLogin} member={member} />}
            />
            <Route path="review" element={<MyReivew member={member} />} />
            <Route
              path="qna/*"
              element={
                <MyQna
                  member={member}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              }
            />

            {/* <Route path="info" element={<MyInfo isLogin={isLogin} setMember={setMember}
                  setIsLogin={setIsLogin} member={member}/>} />
            <Route path="quit" element={<Quit />} />
            <Route path="changepw" element={<MemberChangePw isLogin={isLogin} setMember={setMember}
                  setIsLogin={setIsLogin} member={member}/>}/> */}

            <Route
              path="info"
              element={
                <MyInfo
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="quit" element={<Quit setIsLogin={setIsLogin} />} />
            <Route path="/changepw" element={<MemberChangePw/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
//마이페이지 들어오면 첫 화면
const FirstPage = (props) => {
  const member = props.member;
  return (
    <div className="myProfile-box">
      <div className="profile-img">
        <img src="/image/profile_img/default_profile.png" alt="face" />
      </div>
      <div className="profile-content">
        <div>{member.memberName}님 안녕하세요</div>
      </div>
    </div>
  );
};
//왼쪽메뉴탭
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
