import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//import CustomCalendar from './Calendar';
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { Button2, Button3 } from '../util/Buttons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import "./calender.css";




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

 function CalendarModel(props) {
  const changeStatus = props.changeStatus;
  const setChangeStatus=props.setChangeStatus;
  const navigate = useNavigate();
    const resList = props.resList;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
 

  return (
    <div>
      <Button onClick={handleOpen} >{resList.reservationDate}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            예약날짜 변경하기
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
           <CustomCalendar  resList = {resList} setOpen={setOpen} setChangeStatus={setChangeStatus} changeStatus={changeStatus}/>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
function CustomCalendar(props) {
  const navigate = useNavigate();
  const changeStatus = props.changeStatus;
  const setChangeStatus=props.setChangeStatus;
  const setOpen = props.setOpen;
  const resList = props.resList;
  const nowDate =resList.reservationDate;
  const [value, onChange] = useState(nowDate);
  const activeDate = moment(value).format('YYYY-MM-DD');
 // const [activeDate,setActiveDate ] =useState(moment(value).format('YYYY-MM-DD'));
 //const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);
  //const [nowDate, setNowDate] = useState("날짜");

  const changeDate=()=>{
    const changeStatus = props.changeStatus;
    const setChangeStatus=props.setChangeStatus;
    const reservationDate =activeDate;
    const reservationNo = resList.reservationNo;
    const obj = { reservationNo, reservationDate };
    const token = window.localStorage.getItem("token");
    axios
      .post("/reservation/changeDate", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(activeDate);
        Swal.fire("예약날짜 변경완료");
        setOpen(false);
        setChangeStatus(!changeStatus);
      })
      .catch((res) => {
        console.log(res);
        
      });
  }
  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
  //   setActiveMonth(newActiveMonth);
  // };
const back=()=>{
  setOpen(false);
}
  return (
    <div>
      <Calendar onChange={onChange} value={value}  formatDay={(locale, date) => moment(date).format("DD")} />
         <div className="Calendartext">
          <p>예약변경 선택날짜 : {moment(value).format("YYYY년 MM월 DD일")} </p>   
         </div>
         <div className='btn-box'>
         <div className='changeDate-btn'>
          <Button2  text="날짜 변경" clickEvent={changeDate}/>
         </div>
         <div className='back-btn'>
          <Button3 text="돌아가기" clickEvent={back}/>
         </div>
         </div>
    </div>
  );
}
export {CustomCalendar , CalendarModel} ;