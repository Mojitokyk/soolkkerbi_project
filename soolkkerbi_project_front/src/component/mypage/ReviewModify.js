import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextEditor from "../util/TextEditor";
import { Button1, Button3 } from "../util/Buttons";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
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

export default function ReviewModify(props) {
  const review = props.review;
  const setReviewList = props.setReviewList;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const [open, setOpen] = useState(false);

  //모달용
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //기존에 입력했던 자료들을 useState()에 저장
  const [reviewTitle, setReviewTitle] = useState(review.reviewTitle);
  const [reviewContent, setReviewContent] = useState(review.reviewContent);
  const [reviewRate, setReviewRate] = useState(review.reviewRate);
  const navigate = useNavigate();

  //reviewTitle value값
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setReviewTitle(inputValue);
  };

  //취소버튼 누르면 창 모달창 꺼지기
  const clickCancle = () => {
    setOpen(false);
  };
  const reviewNo = review.reviewNo;

  //리뷰 수정
  const modify = () => {
    //const reviewNo = review.reviewNo;
    const review = {
      reviewTitle,
      reviewContent,
      reviewRate,
      reviewNo,
    };
    //console.log(review);
    if (reviewTitle !== "" && reviewContent !== "") {
      axios
        .post("/review/modify", review)
        .then((res) => {
          //console.log(res.data);
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              title: "수정 완료",
              text: "리뷰가 수정되었습니다.",
            });
            setReviewList(res.data);
            setChangeStatus(!changeStatus);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "입력값을 확인해주세요",
      });
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>수정</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div id="modal-title">리뷰 수정</div>
          <div className="review-form">
            <div id="modal-description">
              <table className="modal-review-content">
                <tbody>
                  <tr>
                    <th>만족도</th>
                    <td>
                      <HalfRating
                        reviewRate={reviewRate}
                        setReviewRate={setReviewRate}
                      />
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
                        value={reviewTitle}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>상세 내용</th>
                    <td>
                      <div className="review-content">
                        <TextEditor
                          data={reviewContent}
                          setData={setReviewContent}
                          url="/review/contentImg"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="review-btn">
              <Button3 text="취소" clickEvent={clickCancle} />
              <Button1 text="등록" clickEvent={modify} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
//별점 컴포넌트
const HalfRating = (props) => {
  const rate = props.reviewRate;
  const reviewRate = Number(rate);
  const setReviewRate = props.setReviewRate;
  const changeRate = (e) => {
    const starValue = e.currentTarget.value;
    const value = Number(starValue);
    setReviewRate(value);
  };
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={reviewRate}
        precision={0.5}
        id="star-rate"
        onChange={changeRate}
      />
    </Stack>
  );
};
