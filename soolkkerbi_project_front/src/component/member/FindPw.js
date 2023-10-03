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



export default function FindPw() {
    const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [memberId, setMemberId] = React.useState("");
  const [memberEmail, setMemberEmail] = React.useState("");
  const [result , setResult] = React.useState(false);
const back =()=>{
    navigate("/login");
}

  const find=(props)=>{
    const member = { memberId, memberEmail};
    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
   if(member != ""&& emailCheck.test(memberEmail)){

       axios
       .post("/member/findpw", member)
       .then((res) => {
        if(res.data != ""){
            console.log(res.data);
            setMemberId(memberId);
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
      <Button onClick={handleOpen}>비밀번호 찾기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!result ?
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          비밀번호 찾기
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="input-wrap">
        <label htmlFor="memberId">아이디 입력</label>
        <Input
          setData={setMemberId}
          data={memberId}
          type="type"
          content="memberId"
        ></Input>
      </div>
      <div className="input-wrap">
      <label htmlFor="memberEmail">이메일 입력</label>
        <Input
          setData={setMemberEmail}
          data={memberEmail}
          type="type"
          content="memberEmail"
        ></Input>
      </div>
      <div style={{marginTop: "30px"}}> <Button1 text="조회하기" clickEvent={find}/></div>
     
                {/* <div>  
                  <h5> 이름 </h5>
                  <input type='text' maxLength='15' name='search_id_name'/>
                </div>
                <div>  
                  <h5> 이메일 </h5>
                  <input type='text' maxLength='20' name='search_id_email'/> 
                
                  <div id='search_id_email_div'>
                    @
                    <input type='text' maxLength='15' name='search_id_write_email'/>
                  </div>
                </div>  이메일 mui뒷부분 선택폼 ?*/}

                {/* <div>
                  <input type='button' value='조회하기' name='search_id_submit'/> 
                </div> */}
          </Typography>
        </Box>
        : //아이디를 조회한 경우
        <div>
                <h4> 아이디 찾기 </h4>

                <div className='Search_id_result'>
                  <p> 아래의 회원 정보를 찾았습니다. </p>

                  <div className='Search_id_result_div'>
                    <div>
                      <h5> 아이디 </h5>
                      {memberId}
                    </div>
                  </div>

                  <div>
                    <Button2 text="돌아가기" clickEvent={back}/>
                    {/* <input type='button' value='돌아가기' name='search_id_back'/> */}
                  </div>
                </div>
              </div>
            }
      </Modal>
    </div>
  );
}