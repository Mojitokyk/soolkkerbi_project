import Swal from "sweetalert2";
import { Button1 } from "../util/Buttons";
import "./myQna.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MyQnaAnswer = (props) => {
  const answerQnaNo = props.qnaNo; //현재 문의사항 번호
  console.log(answerQnaNo);

  return <RegistAnswer answerQnaNo={answerQnaNo} />;
};

const RegistAnswer = (props) => {
  const answerQnaNo = props.answerQnaNo; //현재 문의사항 번호
  console.log(answerQnaNo);
  const [answerList, setAnswerList] = useState([]);
  const [answerContent, setAnswerContent] = useState("");

  //answerContent 입력후 DB연동
  const registAnswer = () => {
    // if (qnaComment !== "" && memberLevel === 1) {
    if (answerContent !== "") {
      const form = new FormData();
      form.append("answerContent", answerContent);
      form.append("answerQnaNo", answerQnaNo);
      // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음
      axios
        .post("/qna/registAnswer", form)
        .then((res) => {
          console.log(res.data);
          setAnswerContent("");

          const insertAnswer = {
            answerQnaNo: answerQnaNo,
            answerContent: answerContent,
          };
          const newArr = [...answerList];
          newArr.push(insertAnswer);
          setAnswerList(newArr);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  //textarea의 변화를 감지한 후, 값을 answerContent에 set하는 함수
  const changeContent = (e) => {
    const inputValue = e.currentTarget.value;
    setAnswerContent(inputValue);
  };
  //Enter로 '등록'을 수행하는 함수
  const enterCheck = (e) => {
    if (e.keyCode === 13) {
      registAnswer();
    }
  };
  return (
    <div className="qnaAnswer-wrap">
      <div className="write-answer-frm">
        <ul>
          <li>
            <span>관리자</span>
          </li>
          <li>
            <textarea
              className="answer-textarea"
              value={answerContent || ""}
              onChange={changeContent}
              onKeyUp={enterCheck}
            ></textarea>
          </li>
          <li>
            <Button1 text="등록" clickEvent={registAnswer} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyQnaAnswer;
