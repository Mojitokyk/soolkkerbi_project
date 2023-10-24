import { useNavigate } from "react-router-dom";
import "./memberChangePw.css";
import { Button1, Button2 } from "../util/Buttons";
import Input from "../util/InputForm";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const MemberChangePw = (props) => {
  const [IsPwauth, setIsPwauth] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [ReqPwMsg, setReqPwMsg] = useState("");
  const token = window.localStorage.getItem("token");

  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const pwReqCheck = () => {
    if (!passwordRegEx.test(memberPw)) {
      setReqPwMsg(
        "비밀번호는 하나 이상의 문자, 하나의 숫자 및 하나의 특수문자 최소 8자입니다."
      );
    } else {
      setReqPwMsg("");
    }
  };

  const pwCheck = () => {
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
        //console.log(res.data);
        if (res.data === 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            icon: "warning",
            text: "비밀번호가 일치하지 않습니다.",
          });
        }
      });
  };
  const changePw = (data) => {
    const token = window.localStorage.getItem("token");
    if (ReqPwMsg == "" && memberPw !== "" && memberPw === memberPwRe) {
      axios
        .post(
          "/member/changePw",
          { memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            setIsPwauth(false);
            setCurrPw("");
            setMemberPw("");
            setMemberPwRe("");
            //navigator("/mypage/info");
          } else {
            Swal.fire({
              icon: "error",
              title: "비밀번호 변경 실패",
              text: "잠시후에 다시 시도해주세요.",
            });
          }
        })
        .catch((res) => {});
    } else {
      Swal.fire({
        icon: "warning",
        text: "비밀번호가 일치하지 않습니다.",
      });
    }
  };
  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">비밀번호 변경</div>
      <div className="pw-auth">
        {IsPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새비밀번호</label>
                  <JoinInputWrap
                    data={memberPw}
                    setData={setMemberPw}
                    type="passWord"
                    content="memberPw"
                    label="비밀번호"
                    CheckMsg={ReqPwMsg}
                    blurEvent={pwReqCheck}
                  />
                </div>
                <div>
                  <label htmlFor="memberPwRe">새비밀번호 확인</label>
                  <JoinInputWrap
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    type="passWord"
                    content="memberPwRe"
                    label="비밀번호확인"
                    //CheckMsg={CheckPwMsg}
                    blurEvent={pwCheck}
                  />
                </div>
              </div>
            </div>
            <div className="change-btn-box">
              <Button2 text="변경하기" clickEvent={changePw} />
            </div>
          </>
        ) : (
          <div className="pw-input-wrap">
            <div>
              <label htmlFor="currPw">현재 비밀번호</label>
              <Input
                type="passWord"
                data={currPw}
                setData={setCurrPw}
                content="currPw"
              />
              <Button2 text="입력" clickEvent={pwCheck} />
            </div>
          </div>
        )}
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

export default MemberChangePw;
