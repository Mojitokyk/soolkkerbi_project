import Input from "../util/InputForm";
import { Button2 } from "../util/Buttons";
import { useState } from "react";
import TextEditor from "../util/TextEditor";
import { useLocation, useNavigate } from "react-router-dom";

const PartyFrm = (props) => {
  const tasteStart = props.tasteStart;
  const setTasteStart = props.setTasteStart;
  const tasteEnd = props.tasteEnd;
  const setTasteEnd = props.setTasteEnd;
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
  const navigate = useNavigate();

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

  const toList = () => {
    return navigate("*");
  };

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
                  <label htmlFor="tasteStart">시음회 시작날짜</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={tasteStart}
                    setData={setTasteStart}
                    content="tasteStart"
                    placeholder="YYYY-MM-DD"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tasteEnd">시음회 종료날짜</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={tasteEnd}
                    setData={setTasteEnd}
                    content="tasteEnd"
                    placeholder="YYYY-MM-DD"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="thumbnail">썸네일</label>
                </td>
                <td>
                  <input
                    className="input-form"
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />
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
          url="/tasting/contentImg"
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
        <Button2 text="목록으로" clickEvent={toList} />
        {type === "modify" ? (
          <Button2 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button2 text="작성하기" clickEvent={buttonEvent} />
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
