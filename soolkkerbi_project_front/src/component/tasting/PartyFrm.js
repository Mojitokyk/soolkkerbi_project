import Input from "../util/InputForm";
import { Button1 } from "../util/Buttons";
import { useState } from "react";
import TextEditor from "../util/TextEditor";

const PartyFrm = (props) => {
  const tasteTitle = props.tasteTitle;
  const setTasteTitle = props.setTasteTitle;
  const tasteContent = props.tasteContent;
  const setTasteContent = props.setTasteContent;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  //const tasteImg = props.tasteImg;
  //const setTasteImg = props.setTasteImg;
  const tasteFilepath = props.tasteFilepath;
  const setTasteFilepath = props.setTasteFilepath;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;

  const thumbnailChange = (e) => {
    const files = e.currentTarget.files; //객체임
    if (files.length !== 0 && files[0] != 0) {
      //files[0] != 0파일이미지가 아닐때
      setThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일 객체 저장
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setTasteFilepath(reader.result);
      };
    } else {
      setThumbnail({});
      setTasteFilepath(null);
    }
  };
//   const changeFile = (e) => {
//     const files = e.currentTarget.files;
//     setBoardFile(files);
//     const arr = new Array();
//     for (let i = 0; i < files.length; i++) {
//       arr.push(files[i].name);
//     }
//     setNewFileList(arr);
//   };
  return (
    <div className="taste-frm-wrap">
      <div className="taste-frm-top">
        <div className="taste-thumbnail">
          {tasteFilepath === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={tasteFilepath} />
          )}
        </div>
        <div className="taste-info">
          <table className="taste-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="tasteTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={tasteTitle}
                    setData={setTasteTitle}
                    content="tasteTitle"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">대표이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />{" "}
                  {/* image/* : 이미지파일만 가능하게 */}
                </td>
              </tr>
              {/* <tr>
                <td>
                  <label htmlFor="boardFile">첨부파일</label>
                </td>
                <td>
                  <input type="file" onChange={changeFile} multiple />
                </td>
              </tr>
              <tr className="file-list">
                <td>첨부파일 목록</td>
                <td>
                  <div className="file-zone">
                    {type === "modify"
                      ? fileList.map((item, index) => {
                          return (
                            <FileItem
                              key={"f" + index}
                              item={item}
                              delFileNo={delFileNo}
                              setDelFileNo={setDelFileNo}
                              fileList={fileList}
                              setFileList={setFileList}
                            />
                          );
                        })
                      : ""}
                    {newFileList.map((item, index) => {
                      return (
                        <p key={"newFile" + index}>
                          <span className="filename">{item}</span>
                        </p>
                      );
                    })}
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="taste-content-box">
        <TextEditor
          data={tasteContent}
          setData={setTasteContent}
          url="/taste/contentImg"
        />
        {/* <textarea
          onChange={(e) => {
            const changeValue = e.currentTarget.value;
            setBoardDetail(changeValue);//값바뀌면 들어가게
          }}
        >
          {boardDetail}
        </textarea> */}
      </div>
      <div className="taste-btn-box">
        {type === "modify" ? (
          <Button1 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="작성하기" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};
// const FileItem = (props) => {
//   const item = props.item;
//   const delFileNo = props.delFileNo;
//   const setDelFileNo = props.setDelFileNo;
//   const fileList = props.fileList;
//   const setFileList = props.setFileList;
//   const deleteFile = () => {
//     delFileNo.push(item.boardFileNo);
//     setDelFileNo([...delFileNo]);
//     const newArr = fileList.filter((file) => {
//       return item.boardFileNo !== file.boardFileNo;
//     });
//     setFileList(newArr);
//   };
//   return (
//     <p>
//       <span className="filename">{item.filename}</span>
//       <span className="material-icons del-file-icon" onClick={deleteFile}>
//         delete
//       </span>
//     </p>
//   );
// };
export default PartyFrm;
