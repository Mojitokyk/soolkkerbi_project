import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import axios from "axios";
import Swal from "sweetalert2";

const NoticeModify = () => {
  const location = useLocation();
  const notice = location.state.notice;
  console.log(notice);
  //변수명과 안 맞춘 것 - 첨부파일(배열, 객체로 받음)
  const [noticeTitle, setNoticeTitle] = useState(notice.noticeTitle);
  const [thumbnail, setThumbnail] = useState({});
  const [noticeContent, setNoticeContent] = useState(notice.noticeContent);
  const [noticeFile, setNoticeFile] = useState([]);

  const [fileList, setFileList] = useState(notice.fileList);
  const [delFileNo, setDelFileNo] = useState([]); //삭제 파일용
  const navigate = useNavigate();

  const modify = () => {
    console.log("수정하기 버튼 클릭시 동작할 함수");
    //전송할 데이터 출력
    console.log(noticeTitle); //수정할 게시글 제목
    console.log(noticeContent); //수정할 게시글 내용
    //추가 데이터
    console.log(noticeFile); //추가된 첨부파일
    console.log(delFileNo); //삭제한 파일 번호

    const form = new FormData();
    form.append("noticeNo", notice.noticeNo); //수정을 위해 boardNo를 전송
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);

    for (let i = 0; i < noticeFile.length; i++) {
      form.append("noticeFile", noticeFile[i]);
    }
    form.append("delFileNo", delFileNo.join("/"));

    axios
      .post("/notice/modify", form)
      .then((res) => {
        console.log(res.data);

        if (res.data === 1) {
          navigate("/notice");
        } else {
          Swal.fire("수정 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div>
      <NoticeFrm
        noticeNo={notice.noticeNo}
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticeContent={noticeContent}
        setNoticeContent={setNoticeContent}
        noticeFile={noticeFile}
        setNoticeFile={setNoticeFile}
        fileList={fileList}
        setFileList={setFileList}
        buttonEvent={modify} //boardWrite.js와 차이점
        delFileNo={delFileNo} //boardWrite.js와 차이점
        setDelFileNo={setDelFileNo} //boardWrite.js와 차이점
        type="modify"
      />
    </div>
  );
};

export default NoticeModify;
