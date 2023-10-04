import { useState } from "react";
import { Button1 } from "../util/Buttons";
import TextEditor from "../util/TextEditor";
import InputTitle from "../util/InputFormTitle";

const MyQnaFrm = (props) => {
  const qnaTitle = props.qnaTitle;
  const setQnaTitle = props.setQnaTitle;
  const qnaContent = props.qnaContent;
  const setQnaContent = props.setQnaContent;
  //   console.log(qnaContent);
  //   console.log(setQnaContent);
  const buttonEvent = props.buttonEvent;
  const type = props.type;

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
          <Button1 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="등록" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default MyQnaFrm;
