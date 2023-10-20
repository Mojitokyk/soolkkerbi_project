import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";

const ReservationDone = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  const reservationStringNo = location.state.reservationStringNo;
  // console.log(member);
  // console.log(taste);
  // console.log(reservationStringNo);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*마이페이지의 예약내역으로 이동하는 함수*/
  const toMypageReservation = () => {
    // console.log("예약 내역 버튼 이벤트");
    navigate("/mypage");
  };

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-title">{taste.tasteTitle}</div>
        <div className="reservation-done-guide">
          <div>예약이 완료되었습니다.</div>
          <div>
            <span>{member.memberName}</span>님의 예약번호는{" "}
            <span>{reservationStringNo}</span>입니다.
          </div>
          <div>
            예약 내역은 마이페이지의 <span>예약 내역</span>에서 확인하실 수
            있습니다.
          </div>
          <div>
            <span onClick={toMypageReservation}>마이페이지로 이동</span>
          </div>
        </div>
      </div>
      <div className="reservation-done-btn">
        <Button2 text="목록으로" clickEvent={toList} />
      </div>
    </>
  );
};
export default ReservationDone;
