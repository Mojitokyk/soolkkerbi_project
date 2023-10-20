import React, { useState } from "react";
import Calendar from "react-calendar";
// import "../mypage/calendar.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button2 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CustomCalendar(props) {
  const resList = props.resList;
  const nowDate = resList.reservationDate;
  const [value, onChange] = useState(nowDate);
  const activeDate = moment(value).format("YYYY-MM-DD");
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);
  //const [nowDate, setNowDate] = useState("날짜");

  const changeDate = () => {
    const reservationDate = activeDate;
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
        Swal.fire({ icon: "success", text: "예약날짜 변경이 완료되었습니다." });
      })
      .catch((res) => {
        console.log(res);
      });
  };
  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
  //   setActiveMonth(newActiveMonth);
  // };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
      <div className="Calendartext">
        <p>예약변경 선택날짜 : {moment(value).format("YYYY년 MM월 DD일")} </p>
      </div>
      <div className="changeDate-btn">
        <Button2 text="날짜 변경" clickEvent={changeDate} />
      </div>
    </div>
  );
}
export default CustomCalendar;
