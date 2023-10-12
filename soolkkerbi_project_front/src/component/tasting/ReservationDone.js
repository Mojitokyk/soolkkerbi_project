import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";

const ReservationDone = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taste = location.state.taste;
  console.log(taste);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*마이페이지의 예약내역으로 이동하는 함수*/
  const toMypageReservation = () => {
    console.log("예약 내역 버튼 이벤트");
    navigate("/mypage/reservation");
  };

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-title">{taste.tasteTitle}</div>
        <div className="reservation-done-guide">
          <div>예약이 완료되었습니다.</div>
          <div>
            예약 내역은 마이페이지의{"  "}
            <span onClick={toMypageReservation}>' 예약 내역 '</span>에서
            확인하실 수 있습니다.
          </div>
        </div>
      </div>
      <div className="reservation-done-btn">
        <Button1 text="목록으로" clickEvent={toList} />
      </div>
    </>
  );
};
export default ReservationDone;
