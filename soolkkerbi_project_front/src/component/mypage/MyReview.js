import "./myReview.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyReview = () => {
  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/review/reviewList/" + reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPageInfo(res.data.pi);
        setReviewList(res.data.list);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">작성 후기</div>
      <div className="my-reviewList-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>리뷰번호</td>
              <td width={"25%"}>상품명</td>
              <td width={"35%"}>리뷰제목</td>
              <td width={"15%"}>작성날짜</td>
              <td width={"15%"}>조회수</td>
            </tr>
          </thead>
          <tbody>
            {reviewList.length > 0 ? (
              reviewList.map((review, index) => {
                return <ReviewList key={"review" + index} review={review} />;
              })
            ) : (
              <>
                <tr>
                  <td colSpan={5} className="emptyReview">
                    리뷰내역이 없습니다.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
//리뷰리스트 가져오기
const ReviewList = (props) => {
  const review = props.review;
  const navigate = useNavigate();
  const reviewClick = () => {
    console.log(review.reviewProductNo);
    // navigate("/product/view", {
    //   productNo: review.reviewProductNo,
    // });
  };
  return (
    <tr onClick={reviewClick} className="moveToDetail">
      <td>{review.reviewNo}</td>
      <td>{review.productName}</td>
      <td>{review.reviewTitle}</td>
      <td>{review.reviewDate}</td>
      <td>{review.reviewReadCount}</td>
    </tr>
  );
};
export default MyReview;
