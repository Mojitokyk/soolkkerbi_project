import "./adminInfo.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import Input from "../util/InputForm";
import Avatar from "@mui/material/Avatar";
import { Button2 } from "../util/Buttons";
import axios from "axios";

const AdminInfo = (props) => {
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;

  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");

  const navigate = useNavigate();

  const setMemberPhone = (data) => {
    member.memberPhone = data;
    setMember({ ...member });
  };

  const phoneregExp = /^\d{3}-\d{3,4}-\d{4}$/;

  const checkPhone = () => {
    if (!phoneregExp.test(member.memberPhone)) {
      setCheckPhoneMsg("010-0000-0000");
    } else {
      setCheckPhoneMsg("");
    }
  };

  const updateMemberPhone = () => {
    const token = window.localStorage.getItem("token");
    if (checkPhoneMsg === "") {
      axios
        .post("/member/changePhone", member, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: "전화번호가 수정되었습니다.",
          });
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "전화번호 양식을 참고하여 작성해주세요.",
      });
    }
  };

  const changePw = () => {
    navigate("/admin/changePw");
  };

  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">회원정보 수정</div>
      <table className="mypage-info-tbl">
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{member.memberId}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{member.memberName}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{member.memberEmail}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td id="member-phone">
              <div>
                <JoinInputWrap
                  data={member.memberPhone}
                  setData={setMemberPhone}
                  type="text"
                  content="setMemberPhone"
                  label="전화번호"
                  blurEvent={checkPhone}
                />
                <Button2 text="변경하기" clickEvent={updateMemberPhone} />
              </div>
              <div className="check-msg">{checkPhoneMsg}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="changepw-btn">
        <Button2
          text="비밀번호 변경하러가기"
          clickEvent={changePw}
          setMember={setMember}
          setIsLogin={setIsLogin}
          member={member}
        />
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
    </>
  );
};

export default AdminInfo;
