import "./myReview.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button1, Button2 } from "../util/Buttons";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import ReviewModify from "./ReviewModify";

const MyReview = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");
  const member = props.member;
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/review/reviewList/" + reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setPageInfo(res.data.pi);
        setReviewList(res.data.list);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, changeStatus]);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">작성 후기</div>
      <div className="my-reviewList-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>리뷰번호</td>
              <td width={"25%"}>상품명</td>
              <td width={"25%"}>리뷰제목</td>
              <td width={"15%"}>작성날짜</td>
              <td width={"7%"}>조회수</td>
              <td width={"18%"} colSpan={2}>
                수정/삭제
              </td>
            </tr>
          </thead>
          <tbody>
            {reviewList.length > 0 ? (
              reviewList.map((review, index) => {
                return (
                  <ReviewList
                    key={"review" + index}
                    review={review}
                    setReviewList={setReviewList}
                    changeStatus={changeStatus}
                    setChangeStatus={setChangeStatus}
                    member={member}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={7} className="emptyReview">
                    리뷰내역이 없습니다.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        {reviewList.length > 0 ? (
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setList={setReviewList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
//리뷰리스트 가져오기
const ReviewList = (props) => {
  const review = props.review;
  console.log(review);
  const setReviewList = props.setReviewList;
  const member = props.member;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const navigate = useNavigate();
  const reviewClick = () => {
    //console.log(review.reviewProductNo);
    navigate("/product/view", {
      state: {
        productNo: review.reviewProductNo,
        member: member,
        like: review.isLike,
      },
    });
  };
  //리뷰 삭제
  const reviewDelete = () => {
    const obj = new Object();
    obj.reviewNo = review.reviewNo;
    //console.log(obj);
    axios
      .post("/review/delete", obj)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "리뷰삭제 완료",
        });
        setChangeStatus(!changeStatus);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <tr className="moveToDetail">
      <td>{review.reviewNo}</td>
      <td onClick={reviewClick}>{review.productName}</td>
      <td onClick={reviewClick}>{review.reviewTitle}</td>
      <td>{review.reviewDate}</td>
      <td>{review.reviewReadCount}</td>
      <td>
        <div className="review-modify-btn">
          <ReviewModify
            review={review}
            setReviewList={setReviewList}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
          />
        </div>
      </td>
      <td>
        <Button2 text="삭제" clickEvent={reviewDelete} />
      </td>
    </tr>
  );
};
export default MyReview;
