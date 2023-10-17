import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button2, Button3 } from "../util/Buttons";
import "./quit.css";


//사용한모달폼!!
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
      const setIsLogin = props.setIsLogin;

      const deleteMember = () => {
        const token = window.localStorage.getItem("token");
        //const [member, setMember] = useState({});
        setOpen(false);
        Swal.fire({
          icon: "warning",
          title: "회원탈퇴",
          text: "회원 탈퇴를 진행하시겠습니까?",
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
                  title: "탈퇴완!.",
                });
                window.localStorage.removeItem("token");
                setIsLogin(false);
                navigate("/");
              })
              .catch((res) => {
                if (res.response.status === 403) {
                  window.localStorage.removeItem("token");
                  setIsLogin(false);
                }
              });
          }
        });
      };
      const back=()=>{
        setOpen(false);
      }

  return (
    <div>
      <Button onClick={handleOpen}>탈퇴하러가기...ㅠㅠ</Button>
      {/* <Button onClick={handleOpen}>회원탈퇴</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="closeModel">
          <span class="material-icons" onClick={back}>close</span>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            진짜 탈퇴하시나요...??
          </Typography>
          
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            진짜 탈퇴하시면 주문내역,찜목록 시음회예약정보 등 전부 사라져요!!ㅠㅠ<br/>
            모든 회원정보와 활동내역의 쿠키들이 사라지기 때문에 다시한번 생각해주세요!!ㅠㅠ!!<br/>
            그래도 탈퇴를 원하시면 아래 버튼을 클릭해주세요<br/>으앙앙ㅠㅠ
            <div className="delete-btn-box">
            <Button3 text="회원 탈퇴" clickEvent={deleteMember} />
            </div>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// export default Quit;



// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Button3 } from "../util/Buttons";
// import "./quit.css";

// const Quit = (props) => {
//   const navigate = useNavigate();
//   const member = props.member;
//   const setMember = props.setMember;
//   const setIsLogin = props.setIsLogin;

//   const deleteMember = () => {
//     const token = window.localStorage.getItem("token");

//     Swal.fire({
//       icon: "warning",
//       title: "회원탈퇴",
//       text: "회원을 탈퇴하시겠습니까?",
//       showCancelButton: true,
//       confirmButtonText: "탈퇴하기",
//       cancelButtonText: "취소",
//     }).then((res) => {
//       if (res.isConfirmed) {
//         const token = window.localStorage.getItem("token");
//         axios
//           .post("/member/deleteMember", null, {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           })
//           .then((res) => {
//             Swal.fire({
//               icon: "success",
//               title: "탈퇴완!.",
//             });
//             window.localStorage.removeItem("token");
//             setIsLogin(false);
//             navigate("/");
//           })
//           .catch((res) => {
//             if (res.response.status === 403) {
//               //console.log("로그인 풀린상황");
//               window.localStorage.removeItem("token");
//               setIsLogin(false);
//             }
//           });
//       }
//     });
//   };



//   return (
//     <div className="mypage-content-warp">
//       <div className="mypage-content-title">내 정보</div>

//       <div className="delete-btn-box">
//         <Button3 text="회원 탈퇴" clickEvent={deleteMember} />
//       </div>
//       </div>
    
//   );
// };

