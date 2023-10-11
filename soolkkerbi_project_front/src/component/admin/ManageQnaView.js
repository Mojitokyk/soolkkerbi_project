import "../mypage/myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";
import MyQnaAnswer from "../mypage/MyQnaAnswer";

const ManageQnaView = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const qnaMemberNo = location.state.qnaMemberNo;
  const [qna, setQna] = useState({});
  const navigate = useNavigate();

  console.log(member.memberLevel);
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

  return (
    <>
      <div className="qna-view-wrap">
        <div className="qna-view-title">{qna.qnaTitle}</div>
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
