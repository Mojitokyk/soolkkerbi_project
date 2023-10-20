import Swal from "sweetalert2";
import { Button2 } from "../util/Buttons";
import "./myQna.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useLocation, useNavigate } from "react-router-dom";

const MyQnaAnswer = (props) => {
  const member = props.member;
  const answerQnaNo = props.qnaNo; //현재 문의사항 번호
  // console.log(answerQnaNo);
  const [answerList, setAnswerList] = useState([]);

  return (
    <div className="qnaAnswer-wrap">
      {member.memberLevel === 1 ? (
        <RegistAnswer
          answerQnaNo={answerQnaNo}
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
      ) : (
        ""
      )}
      <PrintAnswer
        member={member}
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
  // console.log(answerQnaNo);
  const answerList = props.answerList;
  const setAnswerList = props.setAnswerList;
  const [answerContent, setAnswerContent] = useState("");
  const navigate = useNavigate();

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
          // console.log(res.data);
          setAnswerContent("");

          const newArr = [...answerList];
          newArr.push(res.data);
          setAnswerList(newArr);

          document.getElementsByClassName("write-answer-frm")[0].style.display =
            "none";
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire({ icon: "warning", text: "입력값을 확인하세요." });
    }
  };

  // console.log(answerList);

  //textarea의 변화를 감지한 후, 값을 answerContent에 set하는 함수
  const changeContent = (e) => {
    const inputValue = e.currentTarget.value;
    setAnswerContent(inputValue);
  };
  //Enter로 '등록'을 수행하는 함수
  // const enterCheck = (e) => {
  //   if (e.keyCode === 13) {
  //     registAnswer();
  //   }
  // };

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  return (
    <div className="write-answer-frm">
      <ul>
        <div className="write-area">
          <li>
            <span>관리자</span>
          </li>
          <li style={{ whiteSpace: "pre-line" }}>
            <TextareaAutosize
              style={{ boxSizing: "border-box" }}
              className="regist-textarea"
              value={answerContent || ""}
              onChange={changeContent}
              spellcheck="false"
              autoFocus
              // onKeyUp={enterCheck}
            />
          </li>
        </div>
        <li>
          <div className="write-btn">
            <Button2 text="목록으로" clickEvent={toList} />
            <Button2 text="등록" clickEvent={registAnswer} />
          </div>
        </li>
      </ul>
    </div>
  );
};

//답변출력
const PrintAnswer = (props) => {
  const member = props.member;
  const answerQnaNo = props.answerQnaNo; //현재 문의사항 번호
  // console.log(answerQnaNo);
  const answerList = props.answerList;
  const setAnswerList = props.setAnswerList;
  const [answerContent, setAnswerContent] = useState("");
  const [modifyFrm, setModifyFrm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //DB를 통하여 등록된 답변을 출력
    axios
      .get("/qna/printAnswer/" + answerQnaNo)
      .then((res) => {
        // console.log(res.data);
        setAnswerList(res.data);

        //등록된 답변 존재시, 등록 창을 숨김
        const answerFrm =
          document.getElementsByClassName("write-answer-frm")[0];
        if (res.data.length === 0) {
          answerFrm.style.display = "block";
        } else {
          answerFrm.style.display = "none";
        }
      })
      .catch((res) => {
        console.log(res.status);
      });
  }, []);

  //답변 삭제 함수
  const deleteAnswer = (answerNo, index) => {
    // console.log("답변 삭제 함수 클릭");
    // console.log(answerNo);
    // console.log(index);
    // console.log(answerQnaNo);

    const form = new FormData();
    form.append("answerNo", answerNo);
    form.append("answerQnaNo", answerQnaNo);
    axios
      .post("/qna/deleteAnswer", form)
      .then((res) => {
        // console.log(res.data);

        const newArr = [...answerList];
        newArr.splice(index, 1);
        setAnswerList(newArr);

        document.getElementsByClassName("write-answer-frm")[0].style.display =
          "block";
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  //답변 수정 함수
  const modifyAnswerFrm = (answerNo, index) => {
    // console.log("답변 수정양식 함수 클릭");
    // console.log(answerNo);
    // console.log(index);

    setModifyFrm(true);
  };
  const modifyAnswer = (answer, index) => {
    // const answerNo = props.answerNo;
    // console.log(answer.answerNo);
    // console.log(answer.answerContent); /*이전 값*/
    // console.log(answerContent); /*새로운 값*/
    // console.log(index);

    // if (qnaComment !== "" && memberLevel === 1) {
    if (answerContent !== "") {
      const form = new FormData();
      form.append("answerContent", answerContent); /*DB에 새로운 값을 전달*/
      form.append("answerNo", answer.answerNo);
      // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음

      axios
        .post("/qna/modifyAnswer", form)
        .then((res) => {
          // console.log(res.data);
          setAnswerContent("");

          const newArr = [...answerList];

          /*출력을 위해 이전 값에 새로운 값을 대입*/
          answer.answerContent = answerContent;

          /*splice함수로 수정된 객체를 기존의 인덱스 위치에 삽입*/
          newArr.splice(index, 1, answer);
          setAnswerList(newArr);

          setModifyFrm(false);
        })
        .catch((res) => {
          console.log(res.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  //textarea의 변화를 감지한 후, 값을 answerContent에 set하는 함수
  const changeContent = (e) => {
    // console.log("content-change");
    const inputValue = e.currentTarget.value;
    setAnswerContent(inputValue);
    // console.log(answerContent);
  };
  //Enter로 '등록'을 수행하는 함수
  // const enterCheck = (e) => {
  //   if (e.keyCode === 13) {
  //     modifyAnswer();
  //   }
  // };

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("*");
  };

  //수정취소 함수
  const cancelModify = () => {
    // console.log(answerQnaNo);
    setModifyFrm(false);
  };

  return (
    <div className="qnaAnswer-list">
      {answerList.map((answer, index) => {
        return (
          <div key={index}>
            {modifyFrm === false ? (
              <>
                <div className="print-qnaComment-wrap">
                  <ul>
                    <li>
                      <span>관리자</span>
                    </li>
                    <li>
                      <div className="qnaComment-content">
                        {/* <p>{answer.answerNo}</p> */}
                        <p>{answer.answerDate}</p>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {answer.answerContent}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                {member.memberLevel === 1 ? (
                  <div className="qnaComment-link">
                    <Button2 text="목록으로" clickEvent={toList} />
                    <button
                      onClick={() => {
                        modifyAnswerFrm(answer.answerNo, index);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        deleteAnswer(answer.answerNo, index, answerQnaNo);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <div className="modify-answer-frm">
                  <ul>
                    <li>
                      <span>관리자</span>
                    </li>
                    <li style={{ whiteSpace: "pre-line" }}>
                      <TextareaAutosize
                        className="modify-textarea"
                        onChange={changeContent}
                        // onKeyUp={enterCheck}
                        spellCheck="false"
                        // autoFocus
                      >
                        {answer.answerContent}
                      </TextareaAutosize>
                      <input type="hidden" value={answer.answerNo} />
                    </li>
                  </ul>
                </div>
                <div className="modify-btn">
                  <button
                    className="cancel-modifyAnswer-btn"
                    onClick={cancelModify}
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      modifyAnswer(answer, index);
                    }}
                  >
                    수정완료
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default MyQnaAnswer;
