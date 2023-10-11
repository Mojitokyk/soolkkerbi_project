import "./partyMain.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import { Button2, Button3 } from "../util/Buttons";
import Swal from "sweetalert2";

const PartyView = (props) => {
  const member = props.member;
  const location = useLocation();
  const partyNo = location.state.partyNo;
  const [party, setParty] = useState({});
  const navigate = useNavigate();

  console.log("PartyView - location.state.partyNo: " + location.state.partyNo);

  useEffect(() => {
    console.log("axios - partyNo: " + partyNo);
    axios
      .get("/taste/view/" + partyNo)
      .then((res) => {
        console.log(res.data);
        setParty(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("party");
  };

  //수정 버튼 함수
  const modifyParty = () => {
    console.log("수정 이벤트");
    navigate("/party/modifyParty", { state: { party: party } });
  };

  //삭제 버튼 함수
  const deleteParty = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: "공지사항을 삭제하시겠습니까?",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/taste/delete/" + party.partyNo) //boardNo를 같이 보냄
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/party");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  return (
    <>
      <div className="party-view-wrap">
        <div className="party-view-title">{party.partyTitle}</div>
        <div className="party-view-info">
          <div>{party.memberName}</div>
          <div>{party.partyDate}</div>
        </div>
        <div
          className="party-view-detail"
          dangerouslySetInnerHTML={{ __html: party.partyContent }} //텍스트 에디터를 사용할 경우
        ></div>
      </div>
      <div className="party-view-btn">
        <Button1 text="목록으로" clickEvent={toList} />
        {member.memberLevel === 1 ? (
          <>
            <Button1 text="수정" clickEvent={modifyParty} />
            <Button1 text="삭제" clickEvent={deleteParty} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default PartyView;
