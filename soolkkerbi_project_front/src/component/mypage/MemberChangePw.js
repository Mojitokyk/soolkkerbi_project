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
  const token = window.localStorage.getItem("token");
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
        console.log(res.data);
        if (res.data === 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            icon: "warning",
            title: "비번틀림!!",
          });
        }
      });
  };
  const changePw = (data) => {
    const token = window.localStorage.getItem("token");
    if (memberPw !== "" && memberPw === memberPwRe) {
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
          } else {
            Swal.fire({
              icon: "warning",
              title: "비번변경중 뮨제발생",
            });
          }
        })
        .catch((res) => {});
    } else {
      Swal.fire({
        icon: "success",
        title: "비밀번호가 틀림/작성 확인부탁.",
      });
    }
  };
  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">비밀번호 번경</div>
      <div className="pw-auth">
        {IsPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새비밀번호</label>
                  <Input
                    type="passWord"
                    data={memberPw}
                    setData={setMemberPw}
                    content="memberPw"
                  />
                </div>
                <div>
                  <label htmlFor="memberPwRe">새비밀번호 확인</label>
                  <Input
                    type="passWord"
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    content="memberPwRe"
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
export default MemberChangePw;
