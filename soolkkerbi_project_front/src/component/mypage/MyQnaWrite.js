import { useState } from "react";
import MyQnaFrm from "./MyQnaFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyQnaWrite = () => {
  //제목, 썸네일 , 내용, 첨부파일 작성하여 삽입 -> 전송용 데이터를 담음 state
  //변수명과 맞춘 것 - 문자열
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContnet, setQnaContent] = useState("");

  const navigate = useNavigate();

  //글쓰기 버튼 클릭 시 동작할 함수(서버에 insert요청 함수)
  const write = () => {
    console.log(qnaTitle);
    console.log(qnaContnet);
    if (qnaTitle !== "" && qnaContnet !== "") {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우, JSON을 전송
      //파일이 포함되어 있는 경우 -> FormData
      const form = new FormData();
      form.append("qnaTitle", qnaTitle);
      form.append("qnaContent", qnaContnet);

      const token = window.localStorage.getItem("token");
      axios
        .post("/qna/insert", form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/mypage/qna");
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({ icon: "warning", text: "입력값을 확인하세요." });
    }
  };

  return (
    <div>
      <MyQnaFrm
        qnaTitle={qnaTitle}
        setQnaTitle={setQnaTitle}
        qnaContent={qnaContnet}
        setQnaContent={setQnaContent}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default MyQnaWrite;
