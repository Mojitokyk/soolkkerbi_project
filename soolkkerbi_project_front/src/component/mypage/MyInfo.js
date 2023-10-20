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
 // const memberFilepath=props.memberFilepath;
  const setMemberFilepath =props.setMemberFilepath;

  const [checkPhoneMsg,setCheckPhoneMsg] = useState("");
  const [File ,setFile]=useState("");
  //const [memberImg, setMemberImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
 
  
const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
//const [Image, setImage] = useState(member.setMemberFilepath)
const fileInput = useRef(null)
const [thumbnail, setThumbnail] = useState({});

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




  //프로필사진로직
  const onChange = (e) => {
    const files = e.currentTarget.files;
          if (files.length !== 0 && files[0] != 0) {
            //files[0] != 0파일이미지가 아닐때
            setThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일 객체 저장
           
            //화면에 썸네일 미리보기
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
              setImage(reader.result);
            
            };
          } else {
            setThumbnail({});
            setImage(null);
          }
          console.log(fileInput);
          console.log(thumbnail);
          console.log(Image);
         console.log(member.memberId);
        // const thumbnailCh = JSON.stringify(thumbnail);
         const form = new FormData();
          form.append("memberId", member.memberId);
          form.append("thumbnail",thumbnail);
          const token = window.localStorage.getItem("token");
          axios
          .post("/member/thumbnail", form, {
            headers: {
              contentType: "multipart/form-data",
              processData: false,
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            if (res.data === 1) {
              console.log(res.data)
               //navigate("/mypage");
            } else {
              Swal.fire("프로필수정 중 문제가 생겼어요!");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
          
      };

       console.log(thumbnail);




      //프로필사진 디비저장
    //   const form = new FormData();
    //   form.append("memberId", member.memberId);
    //   form.append("memberFilepath", member.memberFilepath);

    //   const token = window.localStorage.getItem("token");
    // axios
    //   .post("/taste/modify", form, {
    //     headers: {
    //       contentType: "multipart/form-data",
    //       processData: false,
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.data === 1) {
    //       navigate("/taste");
    //     } else {
    //       Swal.fire("수정 중 문제가 발생했습니다. 잠시후 다시 시도해주세요");
    //     }
    //   })
    //   .catch((res) => {
    //     console.log(res.response.status);
    //   });
  

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
                  <div className="mypage-memberImg" >
                  <Avatar
                       src={Image}
                       // size={200}
                       sx={{ width: 160, height: 160 }}
                       onClick={() => {
                         fileInput.current.click();
                       }}
                     />
                     <input 
                        type="file"
                        style={{display:"none"}}
                          accept="image/*"
                          name="profile_img"
                          onChange={onChange}
                          id="thumbnail"
                          ref={fileInput}/>

             

        
       {/* <Profile member={member}/> */}
        <div className="image-putMsg">이미지를 클릭해 변경해주세요</div>
                  </div>
                 
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

            
            // const Profile =(props)=>{
            //   const fileInput =props.fileInput;
            //   const Image=props.Image;
            //   const setImage=props.setImage;
            //   // <Avatar
            //   //          src={Image}
            //   //          style={{ margin: "20px" }}
            //   //          // size={200}
            //   //          sx={{ width: 160, height: 160 }}
            //   //          onClick={() => {
            //   //            fileInput.current.click();
            //   //          }}
            //   //        />

                     
            //           const onChange = e => {
            //             if (e.target.files[0]) {
            //               setImage(e.target.files[0]);
            //             } else {
            //               //업로드 취소할 시
            //               setImage(
            //                 "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            //               );
            //               return;
            //             }
            //           //화면에 프로필 사진 표시
            //             // https://www.habonyphp.com/2019/03/js-api-filereader.html
            //             const reader = new FileReader();
            //             reader.onload = () => {
            //               if (reader.readyState === 2) {
            //                 setImage(reader.result);
            //               }
            //             };
            //             reader.readAsDataURL(e.target.files[0]);
            //           };
            //          return(
            //           <>
            //           <label htmlFor="ex_file">
            //             <div className="btn_select">이미지 선택</div>
            //           </label>
            //           <input
            //             type="file"
            //             id="ex_file"
            //             // style={{ display: "none" }}
            //             accept="image/jpg,image/png,image/jpeg"
            //             name="profile_img"
            //             onChange={onChange}
            //             ref={fileInput}
            //           />
            //           </>
            //          );
            // };

export default MyInfo;
