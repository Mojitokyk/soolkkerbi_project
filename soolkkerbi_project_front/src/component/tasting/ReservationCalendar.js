import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Button1 } from "../util/Buttons";
import moment from "moment";

const ReservationCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  console.log(member);
  console.log(taste);
  const [value, onChange] = useState();

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*'다음'버튼 함수 */
  const reservationConfirm = () => {
    console.log("다음 버튼 이벤트");
    console.log(member);
    console.log(taste);
    navigate("/tasting/reservationConfirm", {
      state: {
        member: member,
        taste: taste,
        // date: date,
      },
    });
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
              value={value}
              formatDay={(locale, date) => moment(date).format("DD")}
            />
          </div>
          <div>{moment(value).format("YYYY년 MM월 DD일")}</div>
        </div>
      </div>
      <div className="reservation-btn">
        <Button1 text="목록으로" clickEvent={toList} />
        <Button1 text="다음" clickEvent={reservationConfirm} />
      </div>
    </>
  );
};
export default ReservationCalendar;
