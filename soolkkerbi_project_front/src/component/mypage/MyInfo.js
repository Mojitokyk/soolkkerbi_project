import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputForm";
import "./myInfo.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MemberChangePw from "./MemberChangePw";
import { useRef, useState } from "react";
//import { Avatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";




const MyInfo = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;

  const [checkPhoneMsg,setCheckPhoneMsg] = useState("");
 
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  // const onChangeImage = e => {
  //   const file = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setUploadedImage(imageUrl);
  // };


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
            title: "전화번호가 수정되었습니다.",
          });
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    } else {
      Swal.fire("전화번호 양식을 참고하여 작성해주세요!");
    }
  };

  const changePw = () => {
    navigate("/mypage/changepw");
  };
  const adminchangePw = () => {
    <MemberChangePw
      setMember={setMember}
      setIsLogin={setIsLogin}
      member={member}
    />;
    //navigate("/changepw",{replace: true});
    //document.querySelectorAll(".my-side a")[5].click();
  };

  return (
    <div className="mypage-content-warp">
      <div className="mypage-content-title">회원정보 수정</div>
      {/* <div>
          {uploadedImage ? (
            <S.MyProfileImg src={uploadedImage} alt="프로필 없을때" />
          ) : (
            <S.MyProfileImg src="./images/profile.png" alt="프로필사진" />
          )}
          <input type="file" onChange={onChangeImage} />
        </div> */}
        
       
        
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
              <div className="check-msg">{checkPhoneMsg}</div>
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

{/*
const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
const fileInput = useRef(null)

 <Avatar 
        src={Image} 
        style={{margin:'20px'}} 
        size={200} 
        onClick={()=>{fileInput.current.click()}}/>

        <input 
 	type='file' 
    	style={{display:'none'}}
        accept='image/jpg,impge/png,image/jpeg' 
        name='profile_img'
        onChange={onChange}
        ref={fileInput}/>

        const onChange = (e) => {
          if(e.target.files[0]){
                    setFile(e.target.files[0])
                }else{ //업로드 취소할 시
                    setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                    return
                }
          //화면에 프로필 사진 표시
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImage(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            } */}

            
            const profile=(props)=>{
              const fileInput =props.fileInput;
              const Image=props.Image;
              const setImage=props.setImage;
              <Avatar
                       src={Image}
                       style={{ margin: "20px" }}
                       // size={200}
                       sx={{ width: 160, height: 160 }}
                       onClick={() => {
                         fileInput.current.click();
                       }}
                     />

                     
                      const onChange = e => {
                        if (e.target.files[0]) {
                          setImage(e.target.files[0]);
                        } else {
                          //업로드 취소할 시
                          setImage(
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          );
                          return;
                        }
                      //화면에 프로필 사진 표시
                        // https://www.habonyphp.com/2019/03/js-api-filereader.html
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      };
                     return(
                      <>
                      <label htmlFor="ex_file">
                        <div className="btn_select">이미지 선택</div>
                      </label>
                      <input
                        type="file"
                        id="ex_file"
                        // style={{ display: "none" }}
                        accept="image/jpg,image/png,image/jpeg"
                        name="profile_img"
                        onChange={onChange}
                        ref={fileInput}
                      />
                      </>
                     );
            };

export default MyInfo;
