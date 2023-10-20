import NoticeFrm from "./NoticeFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NoticeWrite = (props) => {
  //제목, 썸네일 , 내용, 첨부파일 작성하여 삽입 -> 전송용 데이터를 담음 state
  //변수명과 맞춘 것 - 문자열
  //변수명과 안 맞춘 것 - 첨부파일(배열, 객체로 받음)
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [member, setMember] = useState({});
  const isLogin = props.isLogin;
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire({
            title: "로그인이 필요한 서비스입니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/login");
          });
        }
      });
  }, [isLogin]);

  //글쓰기 버튼 클릭 시 동작할 함수(서버에 insert요청 함수)
  const write = () => {
    // console.log(noticeTitle);
    // console.log(noticeContent);
    // console.log(member.memberNo);

    if (noticeTitle !== "" && noticeContent !== "") {
      const obj = new Object();
      obj.noticeMemberNo = member.memberNo;
      obj.noticeTitle = noticeTitle;
      obj.noticeContent = noticeContent;
      // console.log(obj);
      axios
        .post("/notice/insert", obj)
        .then((res) => {
          // console.log(res.data);
          navigate("/notice");
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  return (
    <div>
      <NoticeFrm
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticeContent={noticeContent}
        setNoticeContent={setNoticeContent}
        member={member}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default NoticeWrite;
