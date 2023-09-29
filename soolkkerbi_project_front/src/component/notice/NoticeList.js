import "./notice.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import Pagination from "../common/Pagination";
import axios from "axios";

const NoticeList = (props) => {
  const isLogin = props.isLogin;
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //1로 시작
  const [pageInfo, setPageInfo] = useState({});

  //useEffect: 최초에 1회 수행후, [ ]배열 값이 달라지면 값에 따라 한 번 더 수행
  useEffect(() => {
    //로그인 체크 후 조회시: post
    axios
      .get("/notice/list/" + reqPage) //get메서드 사용
      .then((res) => {
        console.log(res.data); //서버로부터 반환된 pi, boardList가 들어있다.
        setNoticeList(res.data.noticeList); //res.data의 'boardList'key의 값을 setBoardList에 넣음
        setPageInfo(res.data.pi); //res.data의 'pi'key의 값을 setPageInfo에 넣음
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  const navigate = useNavigate();
  const write = () => {
    navigate("noticeWrite");
  };

  return (
    <>
      <table className="notice-list">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>게시일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice, index) => {
            return <NoticeItem key={"notice" + index} notice={notice} />;
          })}
        </tbody>
      </table>

      <div className="notice-write-btn">
        <Button1 text="작성하기" clickEvent={write} />
      </div>

      {/* {isLogin ? (
        <div className="notice-write-btn">
          <Button1 text="작성하기" clickEvent={write} />
        </div>
      ) : (
        ""
      )} */}

      <div className="notice-pagination">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const navigate = useNavigate();
  const noticeView = () => {
    console.log("NoticeItem - noticeNo: " + notice.noticeNo);
    navigate("/notice/noticeView", { state: { noticeNo: notice.noticeNo } });
  };
  return (
    <tr className="notice-item" onClick={noticeView}>
      <td className="notice-item-no">{notice.noticeNo}</td>
      <td className="notice-item-title">{notice.noticeTitle}</td>
      <td className="notice-item-writer">{notice.memberName}</td>
      <td className="notice-item-date">{notice.noticeDate}</td>
    </tr>
  );
};

export default NoticeList;
