import "../mypage/myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import MyQnaAnswer from "../mypage/MyQnaAnswer";

const ManageQnaView = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const [qna, setQna] = useState({});
  const navigate = useNavigate();

  // console.log(member.memberLevel);
  // console.log("QnaView - location.state.qnaNo: " + location.state.qnaNo);

  useEffect(() => {
    // console.log("axios - qnaNo: " + qnaNo);
    axios
      .get("/qna/view/" + qnaNo)
      .then((res) => {
        setQna(res.data);
        // console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <>
      <div className="qna-view-wrap">
        <div className="qna-view-title">{qna.qnaTitle}</div>
        <div className="qna-view-userName">{qna.memberId}</div>
        <div
          className="qna-view-detail"
          dangerouslySetInnerHTML={{ __html: qna.qnaContent }} //텍스트 에디터를 사용할 경우
        ></div>

        <div className="qna-comment-wrap">
          <MyQnaAnswer member={member} qnaNo={qnaNo} />
        </div>
      </div>
    </>
  );
};

export default ManageQnaView;
