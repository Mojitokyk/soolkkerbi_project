import "./default.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Header = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  return (
    <header>
      <div className="main-logo">
        <Link to="/">
          <img src="/image/logo_png/logo_title.png" />
        </Link>
      </div>
      <div className="header-navi">
        <Notice />
        <Category />
        <HeaderMember isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </header>
  );
};

const Notice = () => {
  return (
    <div className="notice">
      <span>
        <Link to="notice">공지사항</Link>
      </span>
    </div>
  );
};

const Category = () => {
  return (
    <div className="category">
      <ul>
        <li>
          <Link to="about">술꺼비 소개</Link>
        </li>
        <li>
          <Link to="direction">오시는 길</Link>
        </li>
        <li>
          주류
          <ul className="sub-navi-ul">
            <li>
              <Link to="/product/takju">탁주</Link>
            </li>
            <li>
              <Link to="/product/yakju">약주/청주</Link>
            </li>
            <li>
              <Link to="/product/fruit">과실주</Link>
            </li>
            <li>
              <Link to="/product/spirits">증류주</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="tasting">시음회</Link>
        </li>
      </ul>
    </div>
  );
};

const HeaderMember = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const navigate = useNavigate();

  const [member, setMember] = useState({});

  /*로그아웃 함수*/
  const logout = () => {
    Swal.fire({
      title: "로그아웃되었습니다.",
      text: "메인페이지로 이동합니다.",
      icon: "info",
    }).then(() => {
      window.localStorage.removeItem("token");
      setIsLogin(false);
    });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((res) => {
          if (res.response.status === 403) {
            Swal.fire("로그인이 필요합니다.").then(() => {
              navigate("/login");
            });
          }
        });
    }
  }, [isLogin]);

  return (
    <div className="member-group">
      {isLogin && member.memberLevel === 1 ? (
        <>
          <span className="adminpage">
            <Link to="/admin">관리자페이지</Link>
          </span>
          <span className="logout">
            <Link to="#" title="로그아웃" onClick={logout}>
              로그아웃
            </Link>
          </span>
        </>
      ) : isLogin && member.memberLevel === 2 ? (
        <>
          <span className="cart">
            <Link to="/cart">술주머니</Link>
          </span>
          <span className="mypage">
            <Link to="/mypage">마이페이지</Link>
          </span>
          <span className="logout">
            <Link to="/" title="로그아웃" onClick={logout}>
              로그아웃
            </Link>
          </span>
        </>
      ) : (
        <>
          <span className="login">
            <Link to="/login">로그인</Link>
          </span>
          <span className="join">
            <Link to="/join">회원가입</Link>
          </span>
        </>
      )}
    </div>
  );
};

export default Header;
