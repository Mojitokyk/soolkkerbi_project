import "./myQna.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const MyQnaView = () => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const qnaNo = location.state.qnaNo;
  const [qna, setQna] = useState({});
  const [member, setMember] = useState(null); //상세보기 - 삭제, 수정: 사용자 정보 조회를 위한 state
  const navigate = useNavigate();

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("qna");
  };

  console.log("QnaView - location.state.qnaNo: " + location.state.qnaNo);
  useEffect(() => {
    console.log("axios - qnaNo: " + qnaNo);
    axios
      .get("/qna/view/" + qnaNo)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //수정 버튼 함수
  const modify = () => {
    console.log("수정 이벤트");
    navigate("/qna/qnaModify", { state: { qna: qna } });
  };

  //삭제 버튼 함수
  const deleteQna = () => {
    console.log("삭제 이벤트");
    Swal.fire({
      icon: "warning",
      text: " 문의사항을 삭제하시겠습니까?",
      shoCanaelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/qna/QnaDelete/" + qna.qnaNo) //boardNo를 같이 보냄
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/qna");
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
        <div className="qna-view-info">
          <div>{qna.qnaDate}</div>
        </div>
        <div className="qna-view-file">
          {qna.fileList
            ? qna.fileList.map((file, index) => {
                return <FileItem key={"file" + index} file={file} />;
              })
            : "테스트"}
        </div>

        <div
          className="qna-view-detail"
          dangerouslySetInnerHTML={{ __html: qna.qnaContent }} //텍스트 에디터를 사용할 경우
        ></div>
        <div className="qna-write-btn">
          <Button1 text="목록으로" clickEvent={toList} />
        </div>
      </div>
    </>
  );
};

const FileItem = (props) => {
  const file = props.file;
  const fileDown = () => {
    axios
      .get("/qna/filedown/" + file.qnaFileNo, {
        //axios는 기본적으로 응답을 JSON으로 받는다. -> 하지만 이번 요청은 파일데이터를 받아야한다.
        //-> 일반적인 JSON으로는 처리가 불가하여 파일로 받을 수 있는 설정이 필요하다.
        responseType: "blob", //파일을 받을 수 있는 형태로 설정
      })
      .then((res) => {
        console.log(res);
        //서버에서 받은 데이터는 바이너리데이터(0, 1)이다 -> blob형식으로 변환
        const blob = new Blob([res.data]);
        //blob데이터를 이용하여 데이터 객체 URL생성
        const fileObjectUrl = window.URL.createObjectURL(blob);

        //blob데이터 url을 다운로드할 링크를 생성
        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.style.display = "none"; //화면에 <a>태그가 안 보이게

        //파일명을 디코딩하는 함수 /인코딩으로 받은 데이터는 디코딩해서 사용한다.
        const downloadFilename = (data) => {
          const disposition = data.headers["content-disposition"];
          const filename = decodeURI(
            disposition
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "")
          );
          return filename;
        };
        //다운로드할 파일 이름 지정
        link.download = downloadFilename(res);

        document.body.appendChild(link); //파일과 연결된 <a>태그를 문서에 추가
        link.click(); //<a>태그를 클릭하여 파일을 다운로드
        link.remove(); //다운로드 후 삭제
        window.URL.revokeObjectURL(fileObjectUrl); //파일링크삭제
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="qna-file">
      <span onClick={fileDown} className="material-icons file-icon">
        file_download
      </span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};

export default MyQnaView;
