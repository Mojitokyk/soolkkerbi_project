import "./myReview.css";
const MyReview = () => {
  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">작성 후기</div>
      <div className="my-reviewList-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>리뷰번호</td>
              <td width={"50%"}>리뷰제목</td>
              <td width={"25%"}>작성날짜</td>
              <td width={"15%"}>조회수</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
export default MyReview;
