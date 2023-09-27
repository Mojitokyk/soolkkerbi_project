import "./myOrder.css";
const MyOrder = (props) => {
  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">주문내역</div>
      <div className="my-order-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>주문날짜</td>
              <td width={"15%"}>주문번호</td>
              <td width={"30%"}>상품명</td>
              <td width={"10%"}>수량</td>
              <td width={"10%"}>상품금액</td>
              <td width={"10%"}>처리상태</td>
              <td width={"15%"}>취소/리뷰</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
export default MyOrder;
