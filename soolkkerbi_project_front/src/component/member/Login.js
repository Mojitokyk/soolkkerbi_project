import { Link, useNavigate } from "react-router-dom";
import Input from "../util/InputForm";
import "./login.css";
import { useState } from "react";
import { Button1, Button2, Button3 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import FindId from "./FindId";
import FindPw from "./FindPw";

const Login = (props) => {
  const setIsLogin = props.setIsLogin;

  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const member = { memberId, memberPw };
    axios
      .post("/member/login", member)
      .then((res) => {
        if (res.data === "실패") {
          Swal.fire("아이디와 비밀번호를 확인해주세요");
        } else {
          window.localStorage.setItem("token", res.data);
          setIsLogin(true);
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  function pressEnter() {
    if (window.event.key === "Enter") {
      login();
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-title">로그인</div>
      <div className="input-wrap login">
        <label htmlFor="memberId">아이디</label>
        <Input
          setData={setMemberId}
          data={memberId}
          type="type"
          content="memberId"
          keyEvent={pressEnter}
        ></Input>
      </div>
      <div className="input-wrap login">
        <label htmlFor="memberPw">비밀번호</label>
        <Input
          setData={setMemberPw}
          data={memberPw}
          type="password"
          content="memberPw"
          keyEvent={pressEnter}
        ></Input>
      </div>

      <div className="search-box">
        <FindId className="find" />
        <span className="material-icons">horizontal_rule</span>
        <FindPw className="find" />
        <span className="material-icons">horizontal_rule</span>
        <Link to="/join">회원가입</Link>
      </div>
      <div className="login-btn-box">
        <Button1 text="로그인" clickEvent={login} id="loginBtn"></Button1>
      </div>
    </div>
  );
};

export default Login;
