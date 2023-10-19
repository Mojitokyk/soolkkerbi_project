import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button3 } from "../util/Buttons";
import "./quit.css";
import { useState } from "react";
import Input from "../util/InputForm";

const Quit = (props) => {
  const navigate = useNavigate();
  const setIsLogin = props.setIsLogin;
  const member = props.member;
  const [currPw, setCurrPw] = useState("");
  const [currPwRe, setCurrPwRe] = useState("");
  const [reqPwMsg, setReqPwMsg] = useState("");

  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const pwReqCheck = () => {
    if (currPw !== member.memberPw) {
      setReqPwMsg("비밀번호를 확인하세요");
    } else {
      setReqPwMsg("");
    }
  };

  const deleteMember = () => {
    Swal.fire({
      icon: "warning",
      title: "회원탈퇴",
      text: "회원을 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const token = window.localStorage.getItem("token");
        axios
          .post("/member/deleteMember", null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "탈퇴완료",
            });
            window.localStorage.removeItem("token");
            setIsLogin(false);
            navigate("/");
          })
          .catch((res) => {
            if (res.response.status === 403) {
              //console.log("로그인 풀린상황");
              window.localStorage.removeItem("token");
              setIsLogin(false);
            }
          });
      }
    });
  };

  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">내 정보</div>
      <div className="delete-input-wrap">
        <div>
          <label htmlFor="currPw">비밀번호 : </label>
          <JoinInputWrap
            data={currPw}
            setData={setCurrPw}
            type="password"
            content="currPw"
            label="비밀번호"
            CheckMsg={reqPwMsg}
            blurEvent={pwReqCheck}
          />
        </div>
        <div>
          <label htmlFor="currPwRe">비밀번호 확인 : </label>
          <JoinInputWrap
            data={currPwRe}
            setData={setCurrPwRe}
            type="password"
            content="currPwRe"
            label="비밀번호 확인"
          />
        </div>
      </div>
      <div className="delete-btn-box">
        <Button3 text="회원 탈퇴" clickEvent={deleteMember} />
      </div>
    </div>
  );
};

const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const CheckMsg = props.CheckMsg;

  return (
    <>
      <div className="input">
        <Input
          type={type}
          data={data}
          setData={setData}
          content={content}
          blurEvent={blurEvent}
        />
      </div>
      <div className="check-msg">{CheckMsg}</div>
    </>
  );
};

export default Quit;
