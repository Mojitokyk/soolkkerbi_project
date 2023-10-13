import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";

const ReservationConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  const selectDate = location.state.selectDate;
  console.log(member);
  console.log(taste);
  console.log(selectDate);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*'예약완료'버튼 함수*/
  const reservationDone = () => {
    console.log("예약완료 버튼 이벤트");
    navigate("/tasting/reservationDone", {
      state: {
        taste: taste,
      },
    });
  };

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-title">{taste.tasteTitle}</div>
        <div className="reservation-info">
          <div className="reservation-info-member">
            <span>예약자</span>
            <span>{member.memberName}</span>
          </div>
          <div className="reservation-info-date">
            <span>날짜</span>
            <span>{selectDate}</span>
          </div>
          <div className="reservation-direction">
            <span>장소</span>
            <span>경기도 남양주시 천마로 163 술꺼비 본사</span>
          </div>
        </div>
      </div>
      <div className="reservation-btn">
        <Button1 text="목록으로" clickEvent={toList} />
        <Button1 text="예약완료" clickEvent={reservationDone} />
      </div>
    </>
  );
};
export default ReservationConfirm;
