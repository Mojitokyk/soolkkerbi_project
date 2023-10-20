import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyQnaFrm from "./MyQnaFrm";
import axios from "axios";
import Swal from "sweetalert2";

const MyQnaModify = () => {
  const location = useLocation();
  const qna = location.state.qna;
  // console.log(qna);
  //변수명과 안 맞춘 것 - 첨부파일(배열, 객체로 받음)
  const [qnaTitle, setQnaTitle] = useState(qna.qnaTitle);
  const [qnaContent, setQnaContent] = useState(qna.qnaContent);

  const navigate = useNavigate();

  const modify = () => {
    console.log("수정하기 버튼 클릭시 동작할 함수");
    //전송할 데이터 출력
    // console.log(qnaTitle); //수정할 게시글 제목
    // console.log(qnaContent); //수정할 게시글 내용

    const form = new FormData();
    form.append("qnaNo", qna.qnaNo); //수정을 위해 boardNo를 전송
    form.append("qnaTitle", qnaTitle);
    form.append("qnaContent", qnaContent);

    axios
      .post("/qna/modify", form, {
        // headers: {
        //   contentType: "multipart/form-data",
        //   processData: false,
        //   Authorization: "Bearer " + token,
        // },
      })
      .then((res) => {
        // console.log(res.data);

        if (res.data === 1) {
          navigate("/mypage/qna/qnaView", { state: { qnaNo: qna.qnaNo } });
        } else {
          Swal.fire({
            icon: " error",
            title: "문의사항 변경 실패",
            text: " 잠시후에 다시 시도해주세요.",
          });
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div>
      <MyQnaFrm
        qnaNo={qna.qnaNo}
        qnaTitle={qnaTitle}
        setQnaTitle={setQnaTitle}
        qnaContent={qnaContent}
        setQnaContent={setQnaContent}
        buttonEvent={modify} //boardWrite.js와 차이점
        type="modify"
      />
    </div>
  );
};

export default MyQnaModify;
