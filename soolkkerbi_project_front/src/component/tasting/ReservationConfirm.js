import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";
import axios from "axios";

const ReservationConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state.member;
  const taste = location.state.taste;
  const selectDate = location.state.selectDate;
  const selectDateFormat = location.state.selectDateFormat;
  const selectDateForReservationNo = location.state.selectDateForReservationNo;
  console.log(member);
  console.log(taste);
  console.log(selectDate);
  console.log(selectDateFormat);
  console.log(selectDateForReservationNo);

  //reservationStringNo 생성
  //RN(예약번호 - reservationNo) + 시음회번호(tasteNo) + 회원번호(memberNo) + 현재날짜(selectDateForReservationNo)
  const reservationStringNo =
    "RN" + taste.tasteNo + member.memberNo + selectDateForReservationNo;
  console.log(reservationStringNo);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  /*'예약완료'버튼 함수*/
  const reservationDone = () => {
    console.log("예약완료 버튼 이벤트");
    console.log(member.memberNo);
    console.log(taste.tasteNo);
    console.log(selectDate);

    const form = new FormData();
    form.append("reservationTasteNo", taste.tasteNo);
    form.append("reservationDate", selectDate);
    form.append("reservationStringNo", reservationStringNo);

    const token = window.localStorage.getItem("token");
    axios
      .post("/taste/insertReservation", form, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);

        navigate("/tasting/reservationDone", {
          state: {
            taste: taste,
            member: member,
            reservationStringNo: reservationStringNo,
          },
        });
      })
      .catch((res) => {
        console.log(res.response.status);
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
            <span>{selectDateFormat}</span>
          </div>
          <div className="reservation-direction">
            <span>장소</span>
            <span>경기도 남양주시 천마로 163 술꺼비 본사</span>
          </div>
        </div>
      </div>
      <div className="reservation-btn">
        <Button2 text="목록으로" clickEvent={toList} />
        <Button2 text="예약완료" clickEvent={reservationDone} />
      </div>
    </>
  );
};
export default ReservationConfirm;
