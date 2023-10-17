import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputForm";
import "./myInfo.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MemberChangePw from "./MemberChangePw";
import { useState } from "react";

const MyInfo = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;
  const [CheckPhoneMsg,setCheckPhoneMsg] = useState("");
  const setMemberPhone = (data) => {
    member.memberPhone = data;
    setMember({ ...member });
  };

  const PhoneregExp = /^\d{3}-\d{3,4}-\d{4}$/;
  const checkPhone =()=>{
    if (!PhoneregExp.test(member.memberPhone)) {
      setCheckPhoneMsg("010-0000-0000");
    } else{
      setCheckPhoneMsg("");
    }
  }
  const updateMemberPhone = () => {
    const token = window.localStorage.getItem("token");
    if(CheckPhoneMsg===""){

      axios
        .post("/member/changePhone", member, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "전화번호가 수정되었습니다.",
          });
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    }else{
      Swal.fire("전화번호양식참고하여 작성해주세요!")
    }
  };

  const changePw = () => {
    navigate("/mypage/changepw");
  };
  const adminchangePw = () => {
    <MemberChangePw setMember={setMember}
    setIsLogin={setIsLogin}
    member={member}/>
    //navigate("/changepw",{replace: true});
    //document.querySelectorAll(".my-side a")[5].click();
  };
  
  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">회원정보 수정</div>
      <table className="mypage-info-tbl">
        <tbody>
          <tr>
            <td>회원번호</td>
            <td>{member.memberNo}</td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{member.memberId}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{member.memberName}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td id="member-phone">
              <div>
                {/* <Input
                  type="text"
                  data={member.memberPhone}
                  setData={setMemberPhone}
                  content="memberPhone"
                  CheckMsg={CheckPhoneMsg}
                  blurEvent={checkPhone}
                /> */}
                <JoinInputWrap
                  data={member.memberPhone}
                  setData={setMemberPhone}
                  type="text"
                  content="setMemberPhone"
                  label="전화번호"
                  //CheckMsg={CheckPhoneMsg}
                  blurEvent={checkPhone}
                 />
                <Button2 text="변경하기" clickEvent={updateMemberPhone} />
              </div>
                <div className="check-msg">{CheckPhoneMsg}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="changepw-btn">
      {/* {member.memberType === 1 ? (
          <Button2
          text="비밀번호 변경하러가기"
           clickEvent={adminchangePw}
          setMember={setMember}
          setIsLogin={setIsLogin}
          member={member}
        /> 
        ) : (
          <Button2
          text="비밀번호 변경하러가기"
           clickEvent={changePw}
          setMember={setMember}
          setIsLogin={setIsLogin}
          member={member}
        /> 
        )} */}
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

export default MyInfo;
