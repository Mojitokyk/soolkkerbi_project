import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";

const ReservationConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  console.log(member);
  console.log(taste);

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
            <div>예약자</div>
            <div>{member.memberNama}</div>
          </div>
          <div className="reservation-info-date">
            <div>날짜</div>
            <div>설정한 날짜 위치</div>
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
