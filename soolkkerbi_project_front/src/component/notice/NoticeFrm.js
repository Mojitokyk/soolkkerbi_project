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
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const noticeNo = props.noticeNo;
  const navigate = useNavigate();

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

export default NoticeFrm;
