import "./partyMain.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2, Button3 } from "../util/Buttons";
import Swal from "sweetalert2";

const PartyView =(props)=>{
    const isLogin = props.isLogin;
    const location = useLocation();
    const tasteNo = location.state.boardNo; // navigate("/board/view", { state: { boardNo: board.boardNo } });
    const [taste, setTaste] = useState({});
    const [member, setMember] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get("/taste/view/" + tasteNo)
        .then((res) => {
          console.log(res.data);
          setTaste(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
  
      if (isLogin) {
        const token = window.localStorage.getItem("token");
        console.log(token);
        axios
          .post("/member/getMember", null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            setMember(res.data);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    }, []);
    const modify = () => {
      navigate("/taste/modify", { state: { taste: taste } });
    };
    const deleteBoard = () => {
      Swal.fire({
        icon: "warning",
        text: "게시글을 삭제하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .get("/taste/delete/" + taste.tasteNo)
            .then((res) => {
              console.log(res.data);
              if (res.date === 1) {
                navigate("/"); //이동안됨 뭐여?
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        }
      });
    };
    const changeStatus = () => {
      const obj = { tasteNo: taste.tasteNo, tasteStatus: 2 };
      const token = window.localStorage.getItem("token");
      axios
        .post("/taste/changeStatus", obj, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            Swal.fire("당신은 치단됨!");
          } else {
            Swal.fire("변경중 문제발생");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    };
  
    return (
      <div className="taste-view-wrap">
        <div className="taste-view-title">{taste.tasteTitle}</div>
        <div className="taste-view-info">
          <div>{taste.memberId}</div>
          <div>{taste.boardDate}</div>
        </div>
        {/* <div className="taste-view-file">
          {taste.fileList
            ? taste.fileList.map((file, index) => {
                return <FileItem key={"file" + index} file={file} />;
              })
            : "테스트"}
        </div> */}
        <div className="taste-view-thumbnail">
          {taste.tasteFilepath ? (
            <img src={"/taste/" + taste.tasteFilepath} />
          ) : (
            <img src="/image/default.png" />
          )}
        </div>
        <div
          className="taste-view-detail"
          dangerouslySetInnerHTML={{ __html: taste.tasteDetail }}
        ></div>
        <div className="taste-view-btn-zone">
          {/* {isLogin ? (
            member && member.memberNo === board.boardWriter ? (
              <>
                <Button2 text="수정" clickEvent={modify} />
                <Button2 text="삭제" clickEvent={deleteBoard} />
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )} */}
          {/* 수정삭제 별개로 관리자젼 차단버튼생성 */}
          {member && member.memberType === 1 ? (
            <>
             <Button2 text="수정" clickEvent={modify} />
             <Button2 text="삭제" clickEvent={deleteBoard} />
            <Button3 text="차단" clickEvent={changeStatus} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  
//   const FileItem = (props) => {
//     const file = props.file;
//     const fileDown = () => {
//       axios
//         .get("/board/fileDown/" + file.boardFileNo, {
//           //axios는 항상 응답을 json ->이 요쳥은 파일데이터를 받아야함
//           //->일반작인 json으로는 처리불가 = 파일로 받게하는 설정
//           responseType: "blob",
//         })
//         .then((res) => {
//           //서버에서 받은 데이터는 바이너리데이터 -> blob형식으로 변환
//           const blob = new Blob([res.data]);
//           //blob데이터를 이용해서 데이터객체 URL 생성
//           const fileObjectUrl = window.URL.createObjectURL(blob);
//           //blob데이터 url을 다운로드할 링크를 생성
//           const link = document.createElement("a");
//           link.href = fileObjectUrl;
//           link.style.display = "none";
//           const downloadFilename = (data) => {
//             const disposition = data.headers["content-disposition"];
//             const filename = decodeURI(
//               disposition
//                 .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
//                 .replace(/['"]/g, "")
//             );
//             return filename;
//           };
//           //다룬로드할 파일 이름 지정
//           link.download = downloadFilename(res);
  
//           document.body.appendChild(link); //파일과 연결된 a태그를 문서에 추가
//           link.click(); //a태그를 클릭해서 다운로드
//           link.remove(); //다운로드 후 삭제
//           window.URL.revokeObjectURL(fileObjectUrl); //파일링크삭제
//         })
//         .catch((res) => {
//           console.log(res.response.status);
//         });
//     };
  
//     return (
//       <div className="board-file">
//         <span onClick={fileDown} className="material-icons file-icon">
//           file_download
//         </span>
//         <span className="file-name">{file.filename}</span>
//       </div>
//     );
//  };
export default PartyView;