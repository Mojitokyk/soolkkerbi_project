import "../mypage/myQna.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import Pagination from "../common/Pagination";
import axios from "axios";

const ManageQnaList = () => {
  const [qnaList, setQnaList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //1로 시작
  const [pageInfo, setPageInfo] = useState({});
  const [answerStatus, setAnswerStatus] = useState("1");

  const selectStatus = (e) => {
    console.log("select 옵션 변경");
    const changeValue = e.currentTarget.value;
    console.log(changeValue);
    setAnswerStatus(changeValue);
  };

  useEffect(() => {
    console.log(answerStatus);
    axios
      .get("/qna/adminList/" + reqPage + "/" + answerStatus) //get메서드 사용
      .then((res) => {
        console.log(res.data); //서버로부터 반환된 pi, boardList가 들어있다.
        setQnaList(res.data.qnaList); //res.data의 'boardList'key의 값을 setBoardList에 넣음
        setPageInfo(res.data.pi); //res.data의 'pi'key의 값을 setPageInfo에 넣음
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, answerStatus]);

  return (
    <>
      <div className="select-status">
        <select onChange={selectStatus} defaultValue="1">
          <option value="1">답변 대기</option>
          <option value="2">답변 완료</option>
        </select>
      </div>
      <table className="qna-list">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>문의일</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          {qnaList.map((qna, index) => {
            return <QnaItem key={"qna" + index} qna={qna} />;
          })}
        </tbody>
      </table>
      <div className="qna-pagination">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </>
  );
};

const QnaItem = (props) => {
  const qna = props.qna;
  const navigate = useNavigate();
  const qnaView = () => {
    console.log("qnaItem - qnaNo: " + qna.qnaNo);
    navigate("/mypage/qna/qnaView", { state: { qnaNo: qna.qnaNo } });
  };
  return (
    <tr className="qna-item" onClick={qnaView}>
      <td className="qna-item-no">{qna.qnaNo}</td>
      <td className="qna-item-title">{qna.qnaTitle}</td>
      <td className="qna-item-date">{qna.qnaDate}</td>
      <td className="qna-item-status">
        {qna.qnaStatus === 1 ? "답변 대기" : "답변 완료"}
      </td>
    </tr>
  );
};

export default ManageQnaList;
