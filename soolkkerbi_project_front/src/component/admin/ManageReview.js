import { useEffect, useState } from "react";
import { Button4 } from "../util/Buttons";
import axios from "axios";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageReview = () => {
  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/review/readAllReview/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, changeStatus]);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">상품후기 관리</div>
      <div className="admin-content-tbl">
        <table>
          <thead>
            <tr>
              <td width={"20%"}>작성일</td>
              <td width={"15%"}>작성자</td>
              <td width={"25%"}>제목</td>
              <td width={"20%"}>상품명</td>
              <td width={"10%"}>별점</td>
              <td width={"10%"}>후기삭제</td>
            </tr>
          </thead>
          <tbody>
            {reviewList.map((review, index) => {
              return (
                <ReviewItem
                  key={"manageReview" + index}
                  review={review}
                  changeStatus={changeStatus}
                  setChangeStatus={setChangeStatus}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          setList={setReviewList}
        />
      </div>
    </div>
  );
};

const ReviewItem = (props) => {
  const review = props.review;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const token = window.localStorage.getItem("token");

  const navigate = useNavigate();

  const deleteReview = () => {
    axios
      .post("/review/delete", review, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire("후기가 삭제되었습니다.").then(() => {
          setChangeStatus(!changeStatus);
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  const clickReview = () => {
    navigate("/product/view");
  };

  return (
    <tr onClick={clickReview}>
      <td>{review.reviewDate}</td>
      <td>
        {review.reviewMemberId === null ? "탈퇴회원" : review.reviewMemberId}
      </td>
      <td>{review.reviewTitle}</td>
      <td>{review.productName}</td>
      <td className="admin-reviewRate-box">
        <div className="material-icons reviewRate-star">star</div>
        <div className="admin-reviewRate">{review.reviewRate}</div>
      </td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="삭제" clickEvent={deleteReview} />
        </div>
      </td>
    </tr>
  );
};

export default ManageReview;
