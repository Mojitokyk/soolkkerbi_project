import { useEffect, useState } from "react";
import { Button4 } from "../util/Buttons";
import axios from "axios";
import Pagination from "../common/Pagination";

const ManageReview = () => {
  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/review/readAllReview/" + reqPage)
      .then((res) => {
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
              <td width={"20%"}>제목</td>
              <td width={"20%"}>상품명</td>
              <td width={"15%"}>별점</td>
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

  return (
    <tr>
      <td>{review.reviewDate}</td>
      <td>{review.reviewMemberId}</td>
      <td>{review.reviewTitle}</td>
      <td>{review.productName}</td>
      <td>{review.reviewRate}</td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="삭제" />
        </div>
      </td>
    </tr>
  );
};

export default ManageReview;
