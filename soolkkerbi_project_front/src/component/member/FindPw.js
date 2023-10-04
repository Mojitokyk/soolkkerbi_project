import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button1, Button2, Button3 } from '../util/Buttons';
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

  const [memberPw, setMemberPw] = React.useState("");
  const [memberPwRe, setMemberPwRe] = React.useState("");
  const [CheckPwMsg, setCheckPWMsg] = React.useState("");

  const [auth, setAuth]=React.useState("");

const pwCheck = () => {
  if (memberPw !== memberPwRe) {
    setCheckPWMsg("비밀번호입력 재확인 해주세욥!");//비번도 정규표현식 완료해얗
  } else {
    setCheckPWMsg("");
  }
};

  const find=(props)=>{
    const member = { memberId, memberEmail};
    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
   if(member != ""&& emailCheck.test(memberEmail)){

       axios
       .post("/member/findpw", member)
       .then((res) => {
        if(res.data != ""){
            console.log(res.data);
            // setMemberId(memberId);
             setResult(true);
             

            

        }else{
            
            Swal.fire("존재하지않은 회원정보입니다!")
            navigate("/login")
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
      {/* <div className='emailAuth'><Button3 text="이메일인증" clickEvent={emailAuth}/></div> */}
     
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
        : //비번을 조회한 경우
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          이메일인증하기
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <div className='authButton'>
          <Button3 text="인증번호받기" onClick={this.sendEmail} />
        </div>
               <div className='emailauthinput'>
               <Input
                 setData={setAuth}
                 data={auth}
                 type="type"
                 content="auth"
               ></Input>
               </div>
               <div className='authclear'><Button1 text="인증하기"  /></div>
                 
                </Typography>
             </Box>
            }
      </Modal>
    </div>
    
  );
  
}
class Signup_page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        //usingemail: false, // 인증번호가 맞아서 가입가능한가??

        number: '',      //보내진 인증번호
        inputnumber: '', //내가 입력한 인증번호
                         // 이 두개가 똑같아야 한다
    }

  }


sendEmail(e){
    e.preventDefault();
    console.log(this.state.email);
    const data = {
        email: this.state.email           //입력한 email state값
    }

    fetch('http://localhost:3001/sendEmail',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(json => {
        this.setState({
            number: json.number,       //number이름의 state값에 생성한 인증번호를 받아왔따
        })

        console.log(this.state.number);
    })
    
  }
  async onSubmit(e) {
    e.preventDefault();
  
    if(this.state.number == this.state.inputnumber){ // 인증번호가 맞는지 검사 현재 number는 스트링 값
        this.setState({
            usingemail : true
        })
        
     console.log("인증번호 맞다");
        
  }
  }
}
