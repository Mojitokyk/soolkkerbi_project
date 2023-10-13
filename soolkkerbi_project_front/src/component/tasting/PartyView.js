import "./PartyView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const PartyView = (props) => {
  const member = props.member;
  const location = useLocation();
  const tasteNo = location.state.tasteNo;
  const [taste, setTaste] = useState({});
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
    navigate("/tasting/modifyTaste", { state: { taste: taste } });
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
          .get("/tast/delete/" + taste.tasteNo)
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
    navigate("/tasting/reservationCalendar", {
      state: { member: member, taste: taste },
    });
  };

  return (
    <>
      <div className="taste-view-wrap">
        <div className="taste-view-title">{taste.tasteTitle}</div>
        <div className="taste-view-info">
          <div>관리자</div> {/*<div>{party.memberName}</div> */}
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
            <Button1 text="수정" clickEvent={modifyTaste} />
            <Button1 text="삭제" clickEvent={deleteTaste} />
          </>
        ) : (
          ""
        )}
        <Button1 text="목록으로" clickEvent={toList} />
        <Button1 text="예약" clickEvent={reservation} />
      </div>
    </>
  );
};
export default PartyView;
