import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PartyModify = () => {
  const location = useLocation();
  const taste = location.state.taste;
  console.log(taste);

  const [tasteTitle, setTasteTitle] = useState("");
    const [thumbnail, setThumbnail] = useState({});
    const [tasteContent, setTasteContent] = useState("");
    const [tasteStart, setTasteStart] = useState(null);
    const [tasteEnd, setTasteEnd] = useState(null);
    const [tasteFilepath, setTasteFilepath] = useState(null);
    const navigate = useNavigate(); //글쓰기 버튼 클릭시 동작할 함수(서버에 insert요청함수)
    const write = () => {
    console.log(tasteTitle);
    console.log(thumbnail);
    console.log(tasteContent);
    if (tasteTitle !== "" && tasteContent !== "") {  
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json전송
      //파일이 포함되어있는 경우 => FormData
      const form = new FormData();
      form.append("tasteStart",tasteStart);
      form.append("tasteEnd",tasteEnd);
      form.append("tasteTitle", tasteTitle);
      form.append("tasteContent", tasteContent);
      form.append("thumbnail", thumbnail);

      const token = window.localStorage.getItem("token");
    axios
      .post("/taste/modify", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/board");
        } else {
          Swal.fire("수정 중 문제가 발생했습니다. 잠시후 다시 시도해주세요");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
};
  return (
    <div>
      <div className="taste-frm-title">시음회 게시글 수정</div>
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
        tasteFilepath={tasteFilepath}
        setTasteFilepath={setTasteFilepath}
        buttonEvent={write}

        type="modify"
      />
    </div>
  );
};
export default PartyModify;
