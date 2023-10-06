import Swal from "sweetalert2";
import { Button1 } from "../util/Buttons";
import "./myQna.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyQnaAnswer = (props) => {
  const answerQnaNo = props.qnaNo; //현재 문의사항 번호
  console.log(answerQnaNo);
  const [answerList, setAnswerList] = useState([]);

  return (
    <div className="qnaAnswer-wrap">
      <RegistAnswer
        answerQnaNo={answerQnaNo}
        answerList={answerList}
        setAnswerList={setAnswerList}
      />
      <PrintAnswer
        answerQnaNo={answerQnaNo}
        answerList={answerList}
        setAnswerList={setAnswerList}
      />
    </div>
  );
};

//답변등록
const RegistAnswer = (props) => {
  const answerQnaNo = props.answerQnaNo; //현재 문의사항 번호
  console.log(answerQnaNo);
  const answerList = props.answerList;
  const setAnswerList = props.setAnswerList;
  const [answerContent, setAnswerContent] = useState("");

  //answerContent 입력후 DB연동 - memberNo를 보내지 않는 문제가 남아있음
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

          const newArr = [...answerList];
          newArr.push(res.data);
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
  );
};

//답변출력
const PrintAnswer = (props) => {
  const answerQnaNo = props.answerQnaNo; //현재 문의사항 번호
  console.log(answerQnaNo);
  const answerList = props.answerList;
  const setAnswerList = props.setAnswerList;
  const [answerContent, setAnswerContent] = useState("");
  const [modifyFrm, setModifyFrm] = useState(false);

  useEffect(() => {
    axios
      .get("/qna/printAnswer/" + answerQnaNo)
      .then((res) => {
        console.log(res.data);
        setAnswerList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //답변 삭제 함수
  const deleteAnswer = (answerNo, index) => {
    console.log("답변 삭제 함수 클릭");
    console.log(answerNo);
    console.log(index);

    axios
      .get("/qna/deleteAnswer/" + answerNo)
      .then((res) => {
        console.log(res.data);

        const newArr = [...answerList];
        newArr.splice(index, 1);
        setAnswerList(newArr);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  //답변 수정 함수
  /*
  const modifyAnswer = (answerNo, index) => {
    console.log("답변 수정 함수 클릭");
    console.log(answerNo);
    console.log(index);

    const modifyAnswerComplete = () => {
      // if (qnaComment !== "" && memberLevel === 1) {
      if (answerContent !== "") {
        const form = new FormData();
        form.append("answerContent", answerContent);
        form.append("answerNo", answerNo);
        // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음
        axios
          .get("/qna/modifyAnswer/" + answerNo)
          .then((res) => {
            console.log(res.data);
            setAnswerContent("");

            const newArr = [...answerList];
            newArr.push(res.data);
            setAnswerList(newArr);
          })
          .catch((res) => {
            console.log(res.response.status);
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
        modifyAnswerComplete();
      }
    };

    return (
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
            <Button1 text="수정완료" clickEvent={modifyAnswerComplete} />
          </li>
        </ul>
      </div>
    );
  };
*/

  const modifyAnswerFrm = (answerNo, index) => {
    console.log("답변 수정양식 함수 클릭");
    console.log(answerNo);
    console.log(index);

    setModifyFrm(true);
  };
  const modifyAnswer = (props) => {
    const answerNo = props.answerNo;

    // if (qnaComment !== "" && memberLevel === 1) {
    if (answerContent !== "") {
      const form = new FormData();
      form.append("answerContent", answerContent);
      form.append("answerNo", answerNo);
      // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음
      axios
        .get("/qna/modifyAnswer/" + answerNo)
        .then((res) => {
          console.log(res.data);
          setAnswerContent("");

          const newArr = [...answerList];
          newArr.push(res.data);
          setAnswerList(newArr);
        })
        .catch((res) => {
          console.log(res.response.status);
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
      modifyAnswer();
    }
  };

  return (
    <div className="qnaAnswer-list">
      {answerList.map((answer, index) => {
        return (
          <div className="print-qnaComment-wrap" key={index}>
            {modifyFrm === false ? (
              <ul>
                <li>
                  <span>관리자</span>
                </li>
                <li>
                  <p className="qnaComment-content">
                    {answer.answerNo}
                    {answer.answerDate}
                    {answer.answerContent}
                  </p>
                  <p className="qnaComment-link">
                    <span
                      onClick={() => {
                        modifyAnswerFrm(answer.answerNo, index);
                      }}
                    >
                      수정
                    </span>
                    <span
                      onClick={() => {
                        deleteAnswer(answer.answerNo, index);
                      }}
                    >
                      삭제
                    </span>
                  </p>
                </li>
              </ul>
            ) : (
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
                      placeholder={answer.answerContent}
                    ></textarea>
                    <input type="text" value={answer.answerNo} />
                  </li>
                  <li>
                    <Button1
                      text="수정완료"
                      clickEvent={modifyAnswer}
                      answerNo={answer.answerNo}
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default MyQnaAnswer;
