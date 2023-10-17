import { useState } from "react";
import { Button2 } from "../util/Buttons";
import TextEditor from "../util/TextEditor";
import InputTitle from "../util/InputFormTitle";
import { useLocation, useNavigate } from "react-router-dom";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const noticeFile = props.noticeFile;
  const setNoticeFile = props.setNoticeFile;
  const noticeImg = props.noticeImg;
  const setNoticeImg = props.setNoticeImg;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  const noticeNo = props.noticeNo;
  const [newFileList, setNewFileList] = useState([]); //새 첨부파일 출력용 state
  const navigate = useNavigate();

  const thumbnailChange = (e) => {
    const files = e.currentTarget.files; //files -> 배열의 형태를 하고 있지만 일반 객체
    if (files.length !== 0 && files[0] !== 0) {
      setThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일 객체 저장
      //화면의 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setNoticeImg(reader.result);
      };
    } else {
      setThumbnail({}); //빈 객체
      setNoticeImg(null); //빈 문자열 "" -> null로 수정됨
    }
  };

  const changeFile = (e) => {
    const files = e.currentTarget.files;
    setNoticeFile(files);

    //파일명 추출
    const arr = new Array();
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i].name);
    }
    setNewFileList(arr);
  };

  //'취소'버튼
  const prev = () => {
    console.log("취소 버튼 클릭");
    navigate("/notice/noticeView", { state: { noticeNo: noticeNo } });
  };

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("notice");
  };

  return (
    <div className="notice-frm-wrap">
      <div className="notice-frm-top">
        <div className="notice-info">
          <table className="notice-info-tbl">
            <tbody>
              <tr>
                <td>
                  <InputTitle
                    type="text"
                    data={noticeTitle}
                    setData={setNoticeTitle}
                    content="noticeTitle"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="notice-content-box">
        <TextEditor
          data={noticeContent}
          setData={setNoticeContent}
          url="/notice/contentImg"
        />
      </div>
      <div className="notice-btn-box">
        {type === "modify" ? (
          <>
            <button className="prev-notice-btn" onClick={prev}>
              취소
            </button>
            <Button2 text="수정하기" clickEvent={buttonEvent} />
          </>
        ) : (
          <>
            <button className="toList-notice-btn" onClick={toList}>
              목록으로
            </button>
            <Button2 text="등록" clickEvent={buttonEvent} />
          </>
        )}
      </div>
    </div>
  );
};

const FileItem = (props) => {
  const item = props.item;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const deleteFile = () => {
    console.log("파일 삭제");
    delFileNo.push(item.noticeFileNo);
    setDelFileNo([...delFileNo]); //추가된 것을 깊은 복사하여 넣음
    const newArr = fileList.filter((file) => {
      //filter: 배열 중 조건식에 맞는 요소만 추출하여 새로운 배열을 생성
      return item.noticeFileNo !== file.noticeFileNo;
    });
    setFileList(newArr);
  };
  return (
    <p>
      <span className="filename">{item.filename}</span>
      <span className="material-icons del-file-icon" onClick={deleteFile}>
        delete
      </span>
    </p>
  );
};

export default NoticeFrm;
