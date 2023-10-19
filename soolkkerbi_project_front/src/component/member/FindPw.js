import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputForm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import Timer from "./Timer";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// module.exports = {
//     // Other rules...
//     plugins: [
//         new NodePolyfillPlugin()
//     ]
// }

// module.exports = {
//   target: 'node',
//  };

// const [open, setOpen] = React.useState(false);
// const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);
// useEffect(()=>{
//   <FindPw />

// },[open])
export default function FindPw() {
  const [isCodeShow, setIsCodeShow] = React.useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [memberId, setMemberId] = React.useState("");
  const [memberEmail, setMemberEmail] = React.useState("");
  const [result, setResult] = React.useState(false);
  const [changeResult, setChangeResult] = React.useState(false);

  const [memberPw, setMemberPw] = React.useState("");
  const [memberPwRe, setMemberPwRe] = React.useState("");
  const [checkPwMsg, setCheckPwMsg] = React.useState("");
  const [pwRegMsg, setReqPwMsg] = React.useState("");

  const [auth, setAuth] = React.useState("");
  const [checkauth, setCheckAuth] = React.useState("");
  const member = { memberId, memberEmail };
  const memberPwChange = { memberId, memberPw };
  const [pageReset, setPageReset] = React.useState(false);

  const passwordReg = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])(?=.*[0-9])[A-Za-z\\d$@$!%*?&]{8,45}"
  );
  //&& passwordReg.test(memberPw)

  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호입력 재확인 해주세욥!");
    } else if (memberPw === memberPwRe) {
      setCheckPwMsg("");
    }
  };

  const pwReg = () => {
    if (passwordReg.test(memberPw)) {
      setReqPwMsg("문자,숫자,특수문자포함 8자 이상입니다");
    } else {
      setReqPwMsg("");
    }
  };

  const find = () => {
    const emailCheck =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (member !== "" && emailCheck.test(memberEmail)) {
      //if (member != "") {
      axios
        .post("/member/findPw", member)
        .then((res) => {
          if (res.data !== "") {
            console.log(res.data);
            setMemberId(res.data);
            setResult(true);
          } else {
            Swal.fire("존재하지않은 회원정보입니다!");
            navigate("/login");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값 확인해주세요!");
    }
  };
  const sendEmail = () => {
    const memberEmail = member.memberEmail;
    console.log(memberEmail);
    axios
      .post("/member/auth", { memberEmail })
      .then((res) => {
        console.log(res.data);
        setCheckAuth(res.data);
        setIsCodeShow(true);
      })
      .catch((res) => {
        console.log(res.response.status);
      });

    //   const { smtpTransport } = require('../config/Email');
    //   var generateRandom = function (min, max) {
    //     var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    //     return ranNum;
    //   }

    //   const auth = {
    //     SendEmail : async(req, res) => {
    //         const number = generateRandom(111111,999999)

    //         const { sendEmail } = req.body;

    //         const mailOptions = {
    //             from: "술꺼비들",
    //             to: sendEmail,
    //             subject: "술꺼비 이메일 인증번호입니다 :)",
    //             text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
    //         };

    //         const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
    //             if (error) {
    //                 return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL))
    //             } else {
    //               /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
    //                 return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
    //                     number: number
    //                 }))
    //             }
    //             smtpTransport.close();
    //         });
    //     }
    // }
  };
  const authcheck = () => {
    if (auth === checkauth) {
      setChangeResult(true);
    } else {
      Swal.fire("인증번호를 다시 확인해 주세요!");
    }
  };
  const changePw = () => {
    // const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    //   if(!pw_check.test(change_password)) {
    //     return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

    //   } else if(change_password !== check_change_password) {
    //     return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    //   }
    //useEffect(()=>{
    if (memberPw !== "" && memberPw === memberPwRe) {
      axios
        .post("/member/memberPwChange", memberPwChange)
        .then((res) => {
          if (res.data === 1) {
            setMemberPw("");
            setMemberPwRe("");
            Swal.fire("비밀번호 재설정완료! 다시 로그인해주세요!");
            setOpen(false);
            setResult(false);
            // setPageReset(true);
          } else {
            Swal.fire({
              icon: "warning",
              title: "비밀번호 변경 중 문제발생",
            });
          }
        })
        .catch((res) => {});
    } else {
      Swal.fire({
        icon: "warning",
        title: "비밀번호가 일치하지 않습니다.",
      });
    }
    // },[open])
  };

  // const back = () => {
  //   setOpen(false);
  //   navigate("/login", {
  //     state: { pageReset: pageReset, setPageReset: setPageReset },
  //   });
  // };

  return (
    <div>
      <p className="find_btn" onClick={handleOpen}>
        비밀번호 찾기
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!result ? (
          <Box sx={style}>
            <div className="closeModel">
              <span className="material-icons quit_off" onClick={handleClose}>
                close
              </span>
            </div>
            <div id="modal-modal-title" variant="h6" component="h2">
              비밀번호 찾기
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="input-wrap">
                <label htmlFor="memberId">아이디 입력</label>
                <Input
                  setData={setMemberId}
                  data={memberId}
                  type="text"
                  content="memberId"
                ></Input>
              </div>
              <div className="input-wrap">
                <label htmlFor="memberEmail">이메일 입력</label>
                <Input
                  setData={setMemberEmail}
                  data={memberEmail}
                  type="text"
                  content="memberEmail"
                ></Input>
              </div>
              <div style={{ marginTop: "30px" }}>
                {" "}
                <Button1 text="조회하기" clickEvent={find} />
              </div>
            </div>
          </Box>
        ) : !changeResult ? (
          //비번을 조회한 경우

          <Box sx={style}>
            <div className="closeModel">
              <span className="material-icons quit_off" onClick={handleClose}>
                close
              </span>
            </div>
            <div id="modal-modal-title" variant="h6" component="h2">
              이메일 인증하기
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="emailauthinput">
                <Input
                  setData={setAuth}
                  data={auth}
                  type="text"
                  content="auth"
                ></Input>
              </div>
              <div className="authButton">
                <Button3 text="인증번호받기" clickEvent={sendEmail} />
              </div>
              <div
                className={
                  "pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red]"
                }
              >
                {isCodeShow ? <Timer /> : ""}
              </div>
            </div>
            <div className="authclear">
              <Button1
                text="인증하기"
                clickEvent={() => {
                  authcheck(auth, checkauth);
                }}
              />
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <div className="closeModel">
              <span className="material-icons quit_off" onClick={handleClose}>
                close
              </span>
            </div>
            <div id="modal-modal-title" variant="h6" component="h2">
              비밀번호 재설정
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="input-wrap">
                <label htmlFor="memberPw">새비밀번호</label>
                <Input
                  type="password"
                  data={memberPw}
                  setData={setMemberPw}
                  content="memberPw"
                  checkMsg={pwRegMsg}
                  blurEvent={pwReg}
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="memberPwRe">비밀번호 재확인</label>
                <Input
                  type="password"
                  data={memberPwRe}
                  setData={setMemberPwRe}
                  content="memberPwRe"
                  //CheckMsg={CheckPwMsg}
                  blurEvent={pwCheck}
                />
              </div>
            </div>
            <div className="change-btn-box">
              <Button2 text="변경하기" clickEvent={changePw} />
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
