import "./myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const MyQnaView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const [qna, setQna] = useState({});
  const [member, setMember] = useState(null); //상세보기 - 삭제, 수정: 사용자 정보 조회를 위한 state
  const navigate = useNavigate();

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
    return navigate("qna");
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
        {/*
        <div className="qna-comment-wrap">
          {memberLevel === 1 ? (
            <>
              <RegistQnaComment />
              <PrintQnaComment />
            </>
          ) : (
            ""
          )}
        </div>
        */}
        {/* <RegistQnaComment />
        <PrintQnaComment /> */}
        <QnaAnswer />
        <div className="qna-view-btn">
          <Button1 text="목록으로" clickEvent={toList} />
          <Button1 text="수정" clickEvent={modifyQna} />
          <Button1 text="삭제" clickEvent={deleteQna} />
        </div>
      </div>
    </>
  );
};

//------------------------------------------------------------------------------------

/*
MyQnaView 함수에 
const [answerList, setAnswerList] = useState([ ]); 배열 변수 선언

댓글 추가 함수
const insertAnswer = (answerContent) => {
	const answer = {
		answerQnaNo: {qnaNo}, 
		answerContent: answerContent,
	}
	const newArr = [...answerList];
	newArr.push(answer);
	setAnswerList(newArr);

댓글 등록 -> DB 등록 -> 이후 진행 없음(등록 텍스트 창을 비워야한다.)
댓글 출력 -> DB로부터 출력(새로고침 필요)

todoList
리스트를 생성
리스트에 추가

길이 1짜리 배열(리스트) 생성 
등록창 생성 -> 등록과 동시에 DB에 등록 ->등록창을 비움 -> 리스트에 추가
리스트 출력
*/

const QnaAnswer = () => {
  const location = useLocation();
  const answerQnaNo = location.state.qnaNo;
  const [answerList, setAnswerList] = useState([]);
  const [answerContent, setAnswerContent] = useState("");

  console.log(answerQnaNo);

  useEffect(() => {
    // if (qnaComment !== "" && memberLevel === 1) {
    if (answerContent !== "") {
      const form = new FormData();
      form.append("answerContent", answerContent);
      form.append("answerQnaNo", answerQnaNo);
      // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음
      axios
        .post("/qna/insertComment", form)
        .then((res) => {
          console.log(res.data);

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
  }, []);

  return (
    <div className="qnaAnswer-wrap">
      <RegistAnswerFrm />
      {/*insertAnswer={insertAnswer}*/}
      <PrintAnswer answerList={answerList} />
    </div>
  );
};

const RegistAnswerFrm = (props) => {
  const insertAnswer = props.insertAnswer;
  const [answerContent, setAnswerContent] = useState("");

  const regist = () => {
    if (answerContent !== "") {
      insertAnswer(answerContent);
      setAnswerContent("");
    }
  };

  const changeContent = (e) => {
    const inputValue = e.currentTarget.value;
    setAnswerContent(inputValue);
  };
  const enterCheck = (e) => {
    if (e.keyCode === 13) {
      regist();
    }
  };

  return (
    <div className="insert-answer-frm">
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
          <Button1 text="등록" clickEvent={regist} />
        </li>
      </ul>
    </div>
  );
};

const PrintAnswer = (props) => {
  const answerList = props.answerList;

  return (
    <div className="qnaAnswer-list">
      {answerList.map((answer, index) => {
        return <Answer key={"answer" + index} answer={answer} index={index} />;
      })}
    </div>
  );
};
const Answer = (props) => {
  const answer = props.answer;
  const index = props.index;

  return (
    <div className="print-qnaComment-wrap">
      <ul>
        <li>
          <span>관리자</span>
        </li>
        <li>
          <p className="qnaComment-content">{answer}</p>
          <p className="qnaComment-link">
            <a>수정</a>
            {/* <a clickEvent={modifyQnaComment}>수정</a> */}
            <a>삭제</a>
            {/* <a clickEvent={deleteQnaComment}>삭제</a> */}
          </p>
        </li>
      </ul>
    </div>
  );
};

//------------------------------------------------------------------------------------

//memberNo를 보내지 않는 문제가 남아있음
const RegistQnaComment = () => {
  const location = useLocation();
  const answerQnaNo = location.state.qnaNo;
  const [answerContent, setAnswerContent] = useState("");
  const navigate = useNavigate();

  const writeComment = () => {
    // if (qnaComment !== "" && memberLevel === 1) {
    if (answerContent !== "") {
      const form = new FormData();
      form.append("answerContent", answerContent);
      form.append("answerQnaNo", answerQnaNo);
      // form.append("memberId", memberId); - memberId -> qnaMemberNo 임시로 DB의 관리자 번호(62)를 넣음
      axios
        .post("/qna/insertComment", form)
        .then((res) => {
          console.log(res.data);
          // window.location.reload();
          setAnswerContent("");
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setAnswerContent(inputValue);
  };

  return (
    <div className="input-qnaComment-wrap">
      <ul>
        <li>
          <span>관리자</span>
        </li>
        <li>
          <input type="hidden" value={answerQnaNo} />
          <textarea
            className="comment-textarea"
            value={answerContent || ""}
            onChange={changeValue}
          ></textarea>
        </li>
        <li>
          <Button1 text="등록" clickEvent={writeComment} />
        </li>
      </ul>
    </div>
  );
};

const PrintQnaComment = () => {
  const location = useLocation();
  const answerQnaNo = location.state.qnaNo;
  const [answerContent, setAnswerContent] = useState("");
  const navigate = useNavigate();

  console.log("PrintQnaComment - answerQnaNo: " + answerQnaNo);

  axios
    .get("/qna/selectOneAnswer/" + answerQnaNo)
    .then((res) => {
      console.log(res.data);
      setAnswerContent(res.data);
    })
    .catch((res) => {
      console.log(res.response.status);
    });

  return (
    <div className="print-qnaComment-wrap">
      <ul>
        <li>
          <span>관리자</span>
        </li>
        <li>
          <p className="qnaComment-content">{answerContent}</p>
          <p className="qnaComment-link">
            <a>수정</a>
            {/* <a clickEvent={modifyQnaComment}>수정</a> */}
            <a>삭제</a>
            {/* <a clickEvent={deleteQnaComment}>삭제</a> */}
          </p>
        </li>
      </ul>
    </div>
  );
};

/*
const deleteQnaComment = () => {
  //댓글, 대댓글 삭제
  function deleteComment(obj, boardCommentNo, boardNo) {
    console.log("boardCommentNo: " + boardCommentNo);
    console.log("boardNo: " + boardNo);
    if (confirm("댓글을 삭제하시겠습니까?")) {
      //컨펌창을 띄운 뒤, '확인'을 누르면 true를 반환
      location.href =
        "/board/deleteComment?boardCommentNo=" +
        boardCommentNo +
        "&boardNo=" +
        boardNo; //BoardController의 deleteComment()로 이동
    }
  } //deleteComment(obj, boardCommentNO, boardNo)
};

const modifyQnaComment = () => {
  //댓글, 대댓글 수정
  function modifyComment(obj, boardCommentNo, boardNo) {
    console.log("boardCommentNo: " + boardCommentNo);
    console.log("boardNo: " + boardNo);
    //1. 현재 작성된 댓글인 <p>태그를 숨기고, 수정창인 <textarea>태그를 보여준다.
    //2. '수정'버튼을 '수정완료'버튼으로 변경 후, 기능도 수정완료 이벤트로 변경한다.
    //3. '삭제'버튼을 '수정취소'버튼으로 변경 후, 기능도 수정취소 이벤트로 변경한다.
    //4. '답글달기'버튼을 숨긴다.

    //1.
    $(obj).parent().prev().prev().hide(); //<a>수정</a>.<p class="comment-link">.<textarea>.<p class="comment-content">.hide()
    $(obj).parent().prev().show(); //<a>수정</a>.<p class="comment-link">.<textarea>.show()

    //2.
    $(obj).text("수정완료"); //<a>수정</a>.text("수정완료"); -> <a>수정완료</a>
    $(obj).attr(
      "onclick",
      "modifyComplate(this, " + boardCommentNo + ", " + boardNo + ")"
    );

    //3.
    $(obj).next().text("수정취소"); //<a>수정</a>.<a>삭제</a>.text("수정취소");
    $(obj)
      .next()
      .attr(
        "onclick",
        "modifyCancel(this, " + boardCommentNo + ", " + boardNo + ")"
      );

    //4.
    $(obj).next().next().hide; //<a>수정</a>.<a>삭제</a>.<a>답글달기</a>.hide();
  } //modifyComment(obj, boardCommentNo, boardNo)
};

const modifyQnaCommentCancel = () => {
  //댓글, 대댓글 수정취소
  function modifyCancel(obj, boardCommentNo, boardNo) {
    console.log("boardCommentNo: " + boardCommentNo);
    console.log("boardNo: " + boardNo);
    //1. 본래 댓글이 있는 <p>태그를 보여주고, 수정창인 <textarea>태그를 숨긴다.
    //2. '수정완료'버튼을 '수정'버튼으로 변경하고, 기능도 수정 이벤트로 변경한다.
    //3. '수정취소'버튼을 '삭제'버튼으로 변경하고, 기능도 삭제 이벤트로 변경한다.
    //4. '답글달기'버튼을 보여준다.

    //1.
    $(obj).parent().prev().prev().show(); //<a>수정취소(삭제)</a>.<p class="comment-link">.<textarea>.<p class="comment-content">.show();
    $(obj).parent().prev().hide(); //<a>수정취소(삭제)</a>.<p class="comment-link">.<textarea>.hide();

    //2.
    $(obj).prev().text("수정"); //<a>수정취소(삭제)</a>.<a>수정완료(수정)</a>.text("수정");
    $(obj)
      .prev()
      .attr(
        "onclick",
        "modifyComment(this, " + boardCommentNo + ", " + boardNo + ")"
      );

    //3.
    $(obj).text("삭제"); //<a>수정취소(삭제)</a>.text("삭제");
    $(obj).attr(
      "onclick",
      "deleteComment(this, " + boardCommentNo + ", " + boardNo + ")"
    );

    //4.
    $(obj).next().show(); //<a>삭제</a>.<a>답글달기</a>.show();
  }
};

const modifyQnaCommentComplete = () => {
  //댓글, 대댓글 수정완료
  function modifyComplate(obj, boardCommentNo, boardNo) {
    console.log("boardCommentNo: " + boardCommentNo);
    console.log("boardNo: " + boardNo);
    //JavaScript에서 <form>태그를 생성하여 데이터를 넣어 서버에 전달(수정한 댓글 내용<textarea>, 댓글 번호(boardCommentNo - boardDao에서 사용), 게시글 번호(boardNo - 댓글 수정 후, 해당 게시글을 띄움))
    //1. <form>태그 생성
    //2. <input>태그를 생성하여, 댓글 번호, 게시글 번호 삽입
    //3. 수정한 내용이 들어 있는 <textarea>태그를 복사
    //4. <form>태그 내부에 댓글 번호, 게시글 번호가 삽입된 <input>태그와, 수정한 내용이 들어있는 <textarea>태그를 삽입
    //5. 완성된 <form>태그를 <body>태그에 추가
    //6. <form>태그 전송

    //1.
    const form = $(
      "<form style='display: none' action='/board/updateComment' method='post'>"
    );

    //2.
    const boardCommentNoInput = $("<input type='text' name='boardCommentNo'>");
    const boardNoInput = $("<input type='text' name='boardRef'>");
    boardCommentNoInput.val(boardCommentNo);
    boardNoInput.val(boardNo);

    //3.
    const modifiedTextarea = $(obj).parent().prev().clone();

    //4.
    form
      .append(boardCommentNoInput)
      .append(boardNoInput)
      .append(modifiedTextarea);

    //5.
    $("body").append(form);

    //6.
    form.submit();
  } //modifyComplate(obj, boardCommentNo, boardNo)
};
*/
export default MyQnaView;
