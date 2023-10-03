import "./default.css";
import { Link } from "react-router-dom";

const Header = () => {
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
        <HeaderMember />
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
          <Link to="#">시음회</Link>
        </li>
      </ul>
    </div>
  );
};

const HeaderMember = () => {
  return (
    <div className="member-group">
      <span className="cart">
        <Link to="/cart">술주머니</Link>
      </span>
      <span className="login">
        <Link to="/login">로그인</Link>
      </span>
      <span className="join">
        <Link to="/join">회원가입</Link>
      </span>
    </div>
  );
};

export default Header;
