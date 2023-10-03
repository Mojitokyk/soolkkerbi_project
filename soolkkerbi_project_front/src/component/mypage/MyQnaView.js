import "./myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const MyQnaView = () => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const [qna, setQna] = useState({});
  const [member, setMember] = useState(null); //상세보기 - 삭제, 수정: 사용자 정보 조회를 위한 state
  const navigate = useNavigate();

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("qna");
  };

  console.log("QnaView - location.state.qnaNo: " + location.state.qnaNo);
  useEffect(() => {
    console.log("axios - qnaNo: " + qnaNo);
    axios
      .get("/qna/view/" + qnaNo)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //수정 버튼 함수
  const modify = () => {
    console.log("수정 이벤트");
    navigate("/qna/qnaModify", { state: { qna: qna } });
  };

  //삭제 버튼 함수
  const deleteQna = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: " 문의사항을 삭제하시겠습니까?",
      shoCanaelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/qna/QnaDelete/" + qna.qnaNo) //boardNo를 같이 보냄
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/qna");
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
        <div className="qna-view-info">
          <div>{qna.qnaDate}</div>
        </div>
        <div className="qna-view-file">
          {qna.fileList
            ? qna.fileList.map((file, index) => {
                return <FileItem key={"file" + index} file={file} />;
              })
            : "테스트"}
        </div>

        <div
          className="qna-view-detail"
          dangerouslySetInnerHTML={{ __html: qna.qnaContent }} //텍스트 에디터를 사용할 경우
        ></div>
        <div className="qna-write-btn">
          <Button1 text="목록으로" clickEvent={toList} />
        </div>
      </div>
    </>
  );
};

export default MyQnaView;
