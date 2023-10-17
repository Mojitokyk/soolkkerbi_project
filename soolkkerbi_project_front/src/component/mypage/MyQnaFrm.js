import { useState } from "react";
import { Button2 } from "../util/Buttons";
import TextEditor from "../util/TextEditor";
import InputTitle from "../util/InputFormTitle";
import { useLocation, useNavigate } from "react-router-dom";

const MyQnaFrm = (props) => {
  const qnaTitle = props.qnaTitle;
  const setQnaTitle = props.setQnaTitle;
  const qnaContent = props.qnaContent;
  const setQnaContent = props.setQnaContent;
  const qnaNo = props.qnaNo;
  //   console.log(qnaContent);
  //   console.log(setQnaContent);
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const navigate = useNavigate();

  //'취소'버튼
  const prev = () => {
    console.log("취소 버튼 클릭");
    navigate("/mypage/qna/qnaView", { state: { qnaNo: qnaNo } });
  };

  /*목록으로 돌아가는 함수*/
  const toList = () => {
    return navigate("qna");
  };

  return (
    <div className="qna-frm-wrap">
      <div className="qna-frm-top">
        <div className="qna-info">
          <table className="qna-info-tbl">
            <tbody>
              <tr>
                <td>
                  <InputTitle
                    type="text"
                    data={qnaTitle}
                    setData={setQnaTitle}
                    content="qnaTitle"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="qna-content-box">
        <TextEditor
          data={qnaContent}
          setData={setQnaContent}
          url="/qna/contentImg"
        />
      </div>
      <div className="qna-btn-box">
        {type === "modify" ? (
          <>
            <button className="prev-qna-btn" onClick={prev}>
              취소
            </button>
            <Button2 text="수정하기" clickEvent={buttonEvent} />
          </>
        ) : (
          <>
            <button className="toList-qna-btn" onClick={toList}>
              목록으로
            </button>
            <Button2 text="등록" clickEvent={buttonEvent} />
          </>
        )}
      </div>
    </div>
  );
};

export default MyQnaFrm;
