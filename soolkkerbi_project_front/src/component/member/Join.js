import { useState } from "react";
import "./join.css";
import Input from "../util/InputForm";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [CheckIdMsg, setCheckIdMsg] = useState("");
 // const [okcheckId, setOkCheckId] = useState(""); 만족시 파란색으로 사용가능?
  const [CheckPwMsg, setCheckPWMsg] = useState("");
  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(memberId)) {
      //정구표현식 만족못함
      setCheckIdMsg("아이디는 영어 대소문자숫자로4-8글자입니다!");
    } else {
      //민족->DB중복채크
      axios
        .get("/member/checkId/" + memberId)
        .then((res) => {
          console.log(res);
          if (res.data == 0) {
            setCheckIdMsg("");
          } else {
            setCheckIdMsg("이미사용중인 아이디");
          }
        })
        .catch((res) => {
          console.log(res);
        });
        setCheckIdMsg("");
    }
  };
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPWMsg("비밀번호입력 재확인 해주세욥!");
    } else {
      setCheckPWMsg("");
    }
  };
 
  const join = () => {
    if (CheckIdMsg === "" && CheckPwMsg === "") {
    
      const member = { memberId, memberPw, memberName, memberPhone };
      axios
       
        .post("/member/join", member)
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            Swal.fire("회원가입완료!");
            navigate("/login");
          } else {
            Swal.fire("에러발생");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      Swal.fire("입력값확인");
    }
  };
  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      <JoinInputWrap
        data={memberId}
        setData={setMemberId}
        type="text"
        content="memberId"
        label="아이디"
        CheckMsg={CheckIdMsg}
        blurEvent={idCheck} 
      />
      <JoinInputWrap
        data={memberPw}
        setData={setMemberPw}
        type="passWord"
        content="memberPw"
        label="비밀번호"
      />
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="passWord"
        content="memberPwRe"
        label="비밀번호확인"
        CheckMsg={CheckPwMsg}
        blurEvent={pwCheck}
      />
      <JoinInputWrap
        data={memberName}
        setData={setMemberName}
        type="text"
        content="memberName"
        label="이름"
      />
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="text"
        content="setMemberPone"
        label="전화번호"
      />
      <div className="join-btn-box">
        <Button1 text="회원가입" clickEvent={join}></Button1>
      </div>
    </div>
  );
};
const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const CheckMsg = props.CheckMsg;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
          />
        </div>
      </div>
      <div className="check-msg">{CheckMsg}</div>
    </div>
  );
};
export default Join;
