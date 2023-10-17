import "./PartyView.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Button2 } from "../util/Buttons";
import moment from "moment";
import Swal from "sweetalert2";
import "../mypage/calendar.css";

const ReservationCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  console.log(member);
  console.log(taste);
  const [value, onChange] = useState();

  console.log(taste.tasteStart);
  console.log(taste.tasteEnd);

  //선택한 날짜
  console.log(moment(value).format("YYYY년 MM월 DD일"));
  console.log(moment(value).format("YYYY/MM/DD"));
  console.log(moment(value).format("YYYYMMDD"));
  const selectDateFormat = moment(value).format("YYYY-MM-DD");
  const selectDate = moment(value).format("YY/MM/DD");
  const selectDateForReservationNo = moment(value).format("YYYYMMDD");

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*'다음'버튼 함수 */
  const reservationConfirm = () => {
    console.log("다음 버튼 이벤트");
    console.log(member);
    console.log(taste);
    console.log(selectDate);
    console.log(selectDateForReservationNo);
    console.log(selectDateFormat);
    console.log(taste.tasteStart);

    if (selectDateFormat < taste.tasteStart) {
      Swal.fire({
        icon: "warning",
        title: "예약 가능한 날짜가 아닙니다.",
        html:
          "선택하신 희망 예약 날짜 : " +
          selectDateFormat +
          "<br/>" +
          "시음회 기간 : " +
          taste.tasteStart +
          " ~ " +
          taste.tasteEnd,
      });
    } else {
      navigate("/tasting/reservationConfirm", {
        state: {
          member: member,
          taste: taste,
          selectDateFormat: selectDateFormat,
          selectDate: selectDate,
          selectDateForReservationNo: selectDateForReservationNo,
        },
      });
    }
  };

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-title">{taste.tasteTitle}</div>
        <div className="reservation-calendar-wrap">
          <div className="calendar-guide">날짜를 선택하세요.</div>
          <div className="calendar">
            <Calendar
              onChange={onChange}
              selectRange={false}
              activeStartDate={new Date(taste.tasteStart)}
              minDate={new Date(taste.tasteStart)}
              maxDate={new Date(taste.tasteEnd)}
              value={value}
              formatDay={(locale, date) => moment(date).format("DD")}
              calendarType={"US"}
            />
            <span>희망 예약 날짜</span>
            <span>:</span>
            <span>{selectDateFormat}</span>
          </div>
        </div>
      </div>
      <div className="reservation-btn">
        <Button2 text="목록으로" clickEvent={toList} />
        <Button2 text="다음" clickEvent={reservationConfirm} />
      </div>
    </>
  );
};
export default ReservationCalendar;
