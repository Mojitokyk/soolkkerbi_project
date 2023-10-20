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

  const pwCheck = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          //setIsPwauth(true);
          deleteMember();
          setCurrPw("")
        } else {
          Swal.fire({
            icon: "warning",
            text: "비밀번호가 일치하지 않습니다.",
          });
        }
      });
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
      <div className="delete-input-wrap">
        <div>
          <div className="title">
            <label htmlFor="currPwRe">비밀번호 확인</label>
          </div>
          
          <Input
                type="passWord"
                data={currPw}
                setData={setCurrPw}
                content="currPw"
              />
              <Button3 text="탈퇴하기" clickEvent={pwCheck} />
              
        </div>
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
