import { useState } from "react";
import "./cancelPay.css";

const CancelPay = () => {
  const [payList, setPayList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqpage, setReqPage] = useState(1);

  return (
    <div className="cancelPay-wrap">
      <div className="cancelPay-title">결제취소 관리</div>
      <div className="cancelPay-content">
        <table>
          <thead>
            <tr>
              <td width={"20%"}>결제일</td>
              <td width={"20%"}>주문번호</td>
              <td width={"15%"}>구매자</td>
              <td width={"20%"}>상품명</td>
              <td width={"15%"}>상품가격</td>
              <td width={"10%"}>취소확정</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default CancelPay;
