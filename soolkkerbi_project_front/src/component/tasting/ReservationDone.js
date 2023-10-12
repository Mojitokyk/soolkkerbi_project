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

  return (
    <>
      <div className="reservation-wrap">
        <div className="reservation-title">{taste.tasteTitle}</div>
        <div className="reservation-done-guide">예약이 완료되었습니다.</div>
      </div>
      <div className="reservation-done-btn">
        <Button1 text="목록으로" clickEvent={toList} />
      </div>
    </>
  );
};
export default ReservationDone;
