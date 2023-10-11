import "./myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";
import MyQnaAnswer from "./MyQnaAnswer";

const MyQnaView = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const [qna, setQna] = useState({});
  const navigate = useNavigate();

  console.log(member.memberLevel);
  console.log("QnaView - location.state.qnaNo: " + location.state.qnaNo);

  useEffect(() => {
    console.log("axios - qnaNo: " + qnaNo);
    axios
      .get("/qna/view/" + qnaNo)
      .then((res) => {
        console.log(res.data);
        setQna(res.data);
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
  const modifyQna = () => {
    console.log("수정 이벤트");
    navigate("/mypage/qna/qnaModify", { state: { qna: qna } });
  };

  //삭제 버튼 함수
  const deleteQna = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: " 문의사항을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/qna/delete/" + qna.qnaNo) //boardNo를 같이 보냄
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/mypage/qna");
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
      <div className="qna-view-wrap">
        <div className="qna-view-title">{qna.qnaTitle}</div>
        <div
          className="qna-view-detail"
          dangerouslySetInnerHTML={{ __html: qna.qnaContent }} //텍스트 에디터를 사용할 경우
        ></div>

        <div className="qna-comment-wrap">
          <MyQnaAnswer member={member} qnaNo={qnaNo} />
        </div>

        {member.memberLevel === 2 ? (
          <div className="qna-view-btn">
            <Button1 text="목록으로" clickEvent={toList} />
            <Button1 text="수정" clickEvent={modifyQna} />
            <Button1 text="삭제" clickEvent={deleteQna} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MyQnaView;
