import "./notice.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const NoticeView = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const location = useLocation();
  const noticeNo = location.state.noticeNo;
  const [notice, setNotice] = useState({});
  const navigate = useNavigate();

  console.log(
    "NoticeView - location.state.noticeNo: " + location.state.noticeNo
  );
  useEffect(() => {
    console.log("axios - noticeNo: " + noticeNo);
    axios
      .get("/notice/view/" + noticeNo)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("notice");
  };

  //수정 버튼 함수
  const modifyNotice = () => {
    console.log("수정 이벤트");
    navigate("/notice/noticeModify", { state: { notice: notice } });
  };

  //삭제 버튼 함수
  const deleteNotice = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: "공지사항을 삭제하시겠습니까?",
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/notice/delete/" + notice.noticeNo) //boardNo를 같이 보냄
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/notice");
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
      <div className="notice-view-wrap">
        <div className="notice-view-title">{notice.noticeTitle}</div>
        <div className="notice-view-info">
          <div>{notice.memberName}</div>
          <div>{notice.noticeDate}</div>
        </div>
        <div
          className="notice-view-detail"
          dangerouslySetInnerHTML={{ __html: notice.noticeContent }} //텍스트 에디터를 사용할 경우
        ></div>
      </div>
      <div className="notice-view-btn">
        <Button1 text="목록으로" clickEvent={toList} />
        {member.memberLevel === 1 ? (
          <>
            <Button1 text="수정" clickEvent={modifyNotice} />
            <Button1 text="삭제" clickEvent={deleteNotice} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NoticeView;
