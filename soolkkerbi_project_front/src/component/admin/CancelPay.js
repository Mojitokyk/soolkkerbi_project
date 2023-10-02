import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import axios from "axios";
import { Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const CancelPay = () => {
  const [payList, setPayList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/pay/readAllCancelPay/" + reqPage)
      .then((res) => {
        setPayList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">결제취소 관리</div>
      <div className="admin-content-tbl">
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
          <tbody>
            {payList.map((pay, index) => {
              return <PayItem key={"pay" + index} pay={pay} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const PayItem = (props) => {
  const pay = props.pay;

  const payProductPrice = pay.payProductPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const updatePayStatus = () => {
    const payNo = pay.payNo;
    const payStatus = pay.payStatus;
    const p = { payNo, payStatus };

    axios
      .post("/pay/updatePayStatus", p)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("결제취소가 완료되었습니다.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <tr>
      <td>{pay.payDate}</td>
      <td>{pay.payStringNo}</td>
      <td>{pay.payMemberId}</td>
      <td>{pay.payProductName}</td>
      <td>
        {payProductPrice}
        <span> 원</span>
      </td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="취소" clickEvent={updatePayStatus} />
        </div>
      </td>
    </tr>
  );
};

export default CancelPay;
