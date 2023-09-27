import { useState } from "react";
import "./mypageMain.css";
const MypageMain = () => {
  const [menu, setMenu] = useState({});
  return (
    <div className="mypage-all-wrap">
      <div className="mypage-title">마이페이지</div>
      <div className="mypage-content"></div>
    </div>
  );
};
const MySideMenu = (props) => {
  const menu = props.menu;
  const setMenu = props.setMenu;
  return (
    <div className="my-side">
      <ul></ul>
    </div>
  );
};
export default MypageMain;
