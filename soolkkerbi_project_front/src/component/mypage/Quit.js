import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button3 } from "../util/Buttons";
import "./quit.css";

const Quit = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;

  const deleteMember = () => {
    const token = window.localStorage.getItem("token");

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
        //console.log("탈퇴하기 누른경우");
        //탈퇴하기 로직
        axios
          .post("/member/deleteMember", null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "탈퇴완!.",
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

      <div className="delete-btn-box">
        <Button3 text="회원 탈퇴" clickEvent={deleteMember} />
      </div>
      </div>
    
  );
};
export default Quit;
