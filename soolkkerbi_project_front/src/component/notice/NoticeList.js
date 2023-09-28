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
    navigate("write");
  };

  return (
    <>
      <div className="notice-list">
        {noticeList.map((notice, index) => {
          return <NoticeItem key={"notice" + index} notice={notice} />;
        })}
      </div>
      <div className="notice-pagination">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>

      {isLogin ? (
        <div className="notice-write-btn">
          <Button1 text="작성하기" clickEvent={write} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const navigate = useNavigate();
  const noticeView = () => {
    navigate("/notice/NoticeView", { state: { noticeNo: notice.noticedNo } });
  };
  return (
    <div className="notice-item" onClick={noticeView}>
      <div className="notice-item-info">
        <div className="notice-item-no">{notice.noticeNo}</div>
        <div className="notice-item-title">{notice.noticeTitle}</div>
        <div className="notice-item-writer">{notice.memberId}</div>
        <div className="notice-item-date">{notice.noticeDate}</div>
      </div>
    </div>
  );
};

export default NoticeList;
