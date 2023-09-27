import { Link, useNavigate } from "react-router-dom";
import Input from "../util/InputForm";
import "./login.css";
import { useState } from "react";
import { Button1, Button2, Button3 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";

const Login = (props) => {
  const setIsLogin = props.setIsLogin;
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navigate = useNavigate();
  const join = () => {
    navigate("/join");
  };
  const login = () => {
    const member = { memberId, memberPw };
    axios
      .post("/member/login", member)
      .then((res) => {
        if (res.data === "실패") {
          Swal.fire("아이디/비번 확인");
        } else {
          window.localStorage.setItem("token", res.data);
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="login-wrap">
      <div className="login-title">로그인</div>
      <div className="input-wrap">
        <label htmlFor="memberId">아이디</label>
        <Input
          setData={setMemberId}
          data={memberId}
          type="type"
          content="memberId"
        ></Input>
      </div>
      <div className="input-wrap">
        <label htmlFor="memberId">비밀번호</label>
        <Input
          setData={setMemberPw}
          data={memberPw}
          type="passWord"
          content="memberPw"
        ></Input>
      </div>
      <div className="search-box">
        <Link to="#">아이디 찾기</Link>
        <span className="material-icons">horizontal_rule</span>
        <Link to="#">비밀번호찾기</Link>
        <span className="material-icons">horizontal_rule</span>
        <Link to="/join">회원가입</Link>
      </div>
      <div className="login-btn-box">
        <Button1 text="로그인" clickEvent={login}></Button1>
      </div>
    </div>
  );
};

export default Login;
