import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./notice.css";
import NoticeList from "./NoticeList";
import NoticeView from "./NoticeView";
import NoticeWrite from "./NoticeWrite";
import NoticeModify from "./NoticeModify";
import Swal from "sweetalert2";

const NoticeMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");

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
        setMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.data);
      });
  }, [isLogin]);

  return (
    <div className="notice-all-wrap">
      <div className="notice-title">
        <h2>공지사항</h2>
      </div>
      <Routes>
        <Route
          path="noticeWrite"
          element={
            <NoticeWrite
              isLogin={isLogin}
              member={member}
              setMember={setMember}
            />
          }
        />
        <Route
          path="noticeView"
          element={<NoticeView isLogin={isLogin} member={member} />}
        />
        <Route path="noticeModify" element={<NoticeModify />} />
        <Route
          path="*"
          element={<NoticeList isLogin={isLogin} member={member} />}
        />
      </Routes>
    </div>
  );
};

export default NoticeMain;
