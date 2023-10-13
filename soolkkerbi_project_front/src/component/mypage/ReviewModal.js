import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextEditor from "../util/TextEditor";
import { Button1, Button3 } from "../util/Buttons";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 20,
  p: 4,
};

export default function ReviewModal({ order }) {
  // console.log(order);
  const [open, setOpen] = useState(false);

  //모달용
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //리뷰내용 저장받을 state
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRate, setReviewRate] = useState(5);
  //const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  //reviewTitle value값
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setReviewTitle(inputValue);
  };

  const reviewProductNo = order.payProductNo;
  const reviewMemberNo = order.payMemberNo;
  //상품번호 클릭시 동작할 함수(서버에 insert 요청하는 함수)
  const write = () => {
    const review = {
      reviewTitle,
      reviewContent,
      reviewRate,
      reviewMemberNo,
      reviewProductNo,
    };
    console.log(review);

    if (reviewTitle !== "" && reviewContent !== "") {
      axios
        .post("/review/insert", review)
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              title: "등록 완료",
              text: "리뷰가 등록되었습니다.",
            });
            navigate("/");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "입력값 확인",
        text: "입력하지 않은 값이 있는지 확인해주세요",
      });
    }
  };

  //취소버튼 누르면 창 모달창 꺼지기
  const clickCancle = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>리뷰쓰기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div id="modal-title">리뷰 작성</div>
          <div className="review-form">
            <div id="modal-description">
              <table className="modal-review-content">
                <tbody>
                  <tr>
                    <th>만족도</th>
                    <td>
                      <HalfRating setReviewRate={setReviewRate} />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="reviewTitle">상세 제목</label>
                    </th>
                    <td>
                      <input
                        id="reviewTitle"
                        type="text"
                        placeholder="제목을 입력하세요"
                        autoComplete="off"
                        onChange={changeValue}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>상세 내용</th>
                    <td>
                      <TextEditor
                        data={reviewContent}
                        setData={setReviewContent}
                        url="/review/contentImg"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="review-privacy-agree">
                <div className="review-agree-check">
                  <CheckBox />
                </div>
                <div className="review-privacy-agree-txt">
                  <table className="review10">
                    <thead>
                      <tr>
                        <th>이용목적</th>
                        <th>수집항목</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="no-border-left">
                          리뷰 작성자 식별, 리뷰내역 쓰기
                        </td>
                        <td>아이디,이메일,이름</td>
                      </tr>
                    </tbody>
                  </table>
                  <ul className="review11">
                    <li>
                      개인정보의 보유 및 이용기간 : 탈퇴시 지체없이 파기. 단,
                      관계 법령에 의해 보존이 필요한 경우 의무기간 동안 보관
                    </li>
                    <li>
                      이용자는 동의를 거부 할 권리가 있습니다. 단, 동의를 거부
                      할 경우 리뷰 작성이 불가합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="review-btn">
              <Button3 text="취소" clickEvent={clickCancle} />
              <Button1 text="등록" clickEvent={write} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
//별점 컴포넌트
const HalfRating = (props) => {
  const setReviewRate = props.setReviewRate;
  const changeRate = (e) => {
    const starValue = e.currentTarget.value;
    setReviewRate(starValue);
  };
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={5}
        precision={0.5}
        id="star-rate"
        onChange={changeRate}
      />
    </Stack>
  );
};
//체크박스 컴포넌트
const CheckBox = () => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label="개인정보 수집 이용 및 동의"
      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
    />
  );
};
