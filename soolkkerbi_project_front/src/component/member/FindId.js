import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button1, Button2 } from '../util/Buttons';
import Input from "../util/InputForm";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import "./modal.css";

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



export default function FindId() {
    const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [memberName, setMemberName] = React.useState("");
  const [memberEmail, setMemberEmail] = React.useState("");
  const [memberId , setMemberId] = React.useState("");
  const [result , setResult] = React.useState(false);
  const member = {memberName,memberEmail};
const back =()=>{
    //navigate("/login");
    setOpen(false);
}

  const find=()=>{
    
    console.log(member);
   // const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
  // if(member != ""&& emailCheck.test(memberEmail)){
    if(member != ""){
       axios
       .post("/member/findId", member)
       .then((res) => {
        if(res.data != ""){
            console.log(res.data);
            setMemberId(res.data);
            console.log(memberId)
            setResult(true);

            

        }else{
            
            Swal.fire("존재하지않은 회원정보입니다!")
        }
          

       })
       .catch((res) => {
         console.log(res.response.status);
       });
   }else{
    Swal.fire("입력값 확인해주세요!")
   }
}

  return (
    <div>
      <Button onClick={handleOpen}>아이디 찾기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!result ?
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            아이디 찾기
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="input-wrap">
        <label htmlFor="memberId">이름입력</label>
        <Input
          setData={setMemberName}
          data={memberName}
          type="text"
          content="memberName"
        ></Input>
      </div>
      <div className="input-wrap">
      <label htmlFor="memberEmail">이메일입력</label>
        <Input
          setData={setMemberEmail}
          data={memberEmail}
          type="text"
          content="memberEmail"
        ></Input>
      </div>
      <div style={{marginTop: "30px"}}> <Button1 text="조회하기" clickEvent={find}/></div>
                {/*  이메일 mui뒷부분 선택폼 ?*/}

          </div>
        </Box>
        : //아이디를 조회한 경우
        <Box sx={style}>
        <div id="modal-modal-title" variant="h6" component="h2">
          아이디 찾기
        </div>
        <div id="modal-modal-description" sx={{ mt: 2 }}>

                <div className='Search_id_result'>
                  <p> 아래의 회원 정보를 찾았습니다. </p>

                  <div className='Search_id_result_div'>
                    <div>
                      <h5>아이디 <br/> {memberId}</h5> 
                    </div>
                  </div>

                  <div>
                    <Button2 text="돌아가기" clickEvent={back}/>
                    {/* <input type='button' value='돌아가기' name='search_id_back'/> */}
                  </div>
                </div>

            
        </div>
       </Box>
}
      </Modal>
    </div>
  );
}