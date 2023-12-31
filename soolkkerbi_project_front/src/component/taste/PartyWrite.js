import { useState } from "react";
import PartyFrm from "./PartyFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartyWrite = () => {
  const [tasteTitle, setTasteTitle] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [tasteContent, setTasteContent] = useState("");
  const [tasteStart, setTasteStart] = useState(null);
  const [tasteEnd, setTasteEnd] = useState(null);
  const [tasteStatus, setTasteStatus] = useState(1);
  const [tasteFilepath, setTasteFilepath] = useState(null);
  //tasteImg -> 썸네일 미리보기용
  const [tasteImg, setTasteImg] = useState(null);
  const navigate = useNavigate(); //글쓰기 버튼 클릭시 동작할 함수(서버에 insert요청함수)
  const write = () => {
    // console.log(tasteTitle);
    // console.log(thumbnail);
    // console.log(tasteContent);
    if (tasteTitle !== "" && tasteContent !== "") {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json전송
      //파일이 포함되어있는 경우 => FormData
      const form = new FormData();
      form.append("tasteStart", tasteStart);
      form.append("tasteEnd", tasteEnd);
      form.append("tasteTitle", tasteTitle);
      form.append("tasteContent", tasteContent);
      form.append("tasteStatus", tasteStatus);
      form.append("thumbnail", thumbnail); //첨부파일을 전송하는 경우 File객체를 전송
      //첨부파일이 여러개인경우(multiple인 경우 -> 같은 이름으로 첨부파일이 여러개인경우)
      //   for (let i = 0; i < boardFile.length; i++) {
      //     form.append("boardFile", boardFile[i]);
      //   }
      const token = window.localStorage.getItem("token");
      axios
        .post("/taste/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false, //인증키값이랑 같이 파일이라는 타입을 알려둠
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data > 0) {
            navigate("/taste");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({ icon: "warning", text: "입력값을 확인해주세요." });
    }
  };
  return (
    <div className="taste-frm-whole-wrap">
      <div className="taste-frm-title">시음회 등록</div>
      <PartyFrm
        tasteTitle={tasteTitle}
        setTasteTitle={setTasteTitle}
        tasteStart={tasteStart}
        setTasteStart={setTasteStart}
        tasteEnd={tasteEnd}
        setTasteEnd={setTasteEnd}
        tasteContent={tasteContent}
        setTasteContent={setTasteContent}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        tasteImg={tasteImg}
        setTasteImg={setTasteImg}
        tasteFilepath={tasteFilepath}
        setTasteFilepath={setTasteFilepath}
        tasteStatus={tasteStatus}
        setTasteStatus={setTasteStatus}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};
export default PartyWrite;
