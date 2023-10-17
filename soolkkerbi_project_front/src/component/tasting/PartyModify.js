import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PartyFrm from "./PartyFrm";

const PartyModify = () => {
  const location = useLocation();
  const taste = location.state.taste;
  console.log(taste);

  const [tasteTitle, setTasteTitle] = useState(taste.tasteTitle);
  const [thumbnail, setThumbnail] = useState({});
  const [tasteContent, setTasteContent] = useState(taste.tasteContent);
  const [tasteStart, setTasteStart] = useState(taste.tasteStart);
  const [tasteEnd, setTasteEnd] = useState(taste.tasteEnd);
  const [tasteFilepath, setTasteFilepath] = useState(taste.tasteFilepath);
  const navigate = useNavigate(); //글쓰기 버튼 클릭시 동작할 함수(서버에 insert요청함수)
  const modify = () => {
    console.log(tasteTitle);
    console.log(thumbnail);
    console.log(tasteContent);
    console.log(tasteFilepath);

    const form = new FormData();
    form.append("tasteStart", tasteStart);
    form.append("tasteEnd", tasteEnd);
    form.append("tasteTitle", tasteTitle);
    form.append("tasteContent", tasteContent);
    form.append("tasteFilepath", tasteFilepath);
    form.append("thumbnail", thumbnail);
    form.append("tasteNo", taste.tasteNo);

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
          navigate("/tasting");
        } else {
          Swal.fire("수정 중 문제가 발생했습니다. 잠시후 다시 시도해주세요");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="taste-frm-whole-wrap">
      <div className="taste-frm-title">시음회 수정</div>
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
        buttonEvent={modify}
        type="modify"
      />
    </div>
  );
};
export default PartyModify;
