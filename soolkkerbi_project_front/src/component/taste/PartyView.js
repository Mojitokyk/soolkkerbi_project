import "./PartyView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";
import Swal from "sweetalert2";

const PartyView = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const location = useLocation();
  const tasteNo = location.state.tasteNo;
  const [taste, setTaste] = useState({});
  const [doneReservation, setDoneReservation] = useState("0");
  const navigate = useNavigate();

  console.log("PartyView - location.state.tasteNo: " + location.state.tasteNo);
  console.log(member.memberId);

  useEffect(() => {
    console.log("axios - partyNo: " + tasteNo);
    axios
      .get("/taste/view/" + tasteNo)
      .then((res) => {
        console.log(res.data);
        setTaste(res.data);

        const memberNo = member.memberNo;
        axios
          .get("/reservation/getReservationStatus/" + memberNo + "/" + tasteNo)
          .then((res) => {
            console.log(res.data);
            setDoneReservation("1");
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  //수정 버튼 함수
  const modifyTaste = () => {
    console.log("수정 이벤트");
    navigate("/taste/modifyTaste", { state: { taste: taste } });
  };

  //삭제 버튼 함수
  const deleteTaste = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: "시음회를 삭제하시겠습니까?",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/taste/delete/" + taste.tasteNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/taste");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  //예약 진행 함수
  const reservation = () => {
    console.log("예약 이벤트");
    console.log(member);
    console.log(taste);
    console.log(isLogin);
    if (isLogin) {
      if (taste.tasteStatus === "2") {
        Swal.fire({
          icon: "warning",
          title: "예약 불가",
          text: "종료된 시음회 입니다.",
        });
      } else {
        if (doneReservation === 0) {
          console.log(0);
          navigate("/taste/reservationCalendar", {
            state: { member: member, taste: taste },
          });
        } else {
          Swal.fire({
            showCancelButton: true,
            icon: "warning",
            title: "예약 취소",
            html:
              "예약을 취소하시겠습니까?" +
              "<br/>" +
              "(마이페이지 > 예약내역에서 예약취소를 진행할 수 있습니다.)",
          }).then((res) => {
            if (res.value) {
              navigate("/mypage/*");
            }
          });
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      });
      navigate("/login");
    }
  };

  console.log(taste.tasteStatus);
  return (
    <>
      <div className="taste-view-wrap">
        {taste.tasteStatus === "1" ? (
          <div className="taste-view-title">
            [진행중]
            {taste.tasteTitle}
          </div>
        ) : (
          <div className="taste-view-title">
            [종료]
            {taste.tasteTitle}
          </div>
        )}
        <div className="taste-view-info">
          <div>운영자</div> {/*<div>{party.memberName}</div> */}
          {/* <div>{taste.tasteDate}</div> //없음 */}
        </div>
        <div
          className="taste-view-detail"
          dangerouslySetInnerHTML={{ __html: taste.tasteContent }} //텍스트 에디터를 사용할 경우
        ></div>
        <div className="guide-party-date">
          <div>시음회 기간</div>
          <span>{taste.tasteStart}</span>
          <span>~</span>
          <span>{taste.tasteEnd}</span>
        </div>
      </div>
      <div className="taste-view-btn">
        {member.memberLevel === 1 ? (
          <>
            <Button2 text="수정" clickEvent={modifyTaste} />
            <button className="taste-delete-btn" onClick={deleteTaste}>
              삭제
            </button>
          </>
        ) : (
          ""
        )}
        <Button2 text="목록으로" clickEvent={toList} />
        {member.memberLevel === 2 ? (
          <>
            {taste.tasteStatus === "1" ? (
              <>
                {doneReservation === "0" ? (
                  // <Button2 text="예약" clickEvent={reservation} />
                  <button className="reservation-button" onClick={reservation}>
                    예약
                  </button>
                ) : (
                  <button className="reservation-button" onClick={reservation}>
                    예약 취소
                  </button>
                )}
              </>
            ) : (
              <button
                className="disabled-reservation-button"
                onClick={reservation}
              >
                예약
              </button>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default PartyView;
