import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import axios from "axios";
import { Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const ManageReceive = () => {
  const [payList, setPayList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/pay/readAllSuccessPay/" + reqPage)
      .then((res) => {
        setPayList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, changeStatus]);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">상품수령 관리</div>
      <div className="admin-content-tbl">
        <table>
          <thead>
            <tr>
              <td width={"20%"}>주문번호</td>
              <td width={"15%"}>구매자</td>
              <td width={"20%"}>상품명</td>
              <td width={"10%"}>결제금액</td>
              <td width={"25%"}>수령예정일</td>
              <td width={"10%"}>수령확정</td>
            </tr>
          </thead>
          <tbody>
            {payList.length > 0 ? (
              payList.map((pay, index) => {
                return (
                  <PayItem
                    key={"cancelPay" + index}
                    pay={pay}
                    changeStatus={changeStatus}
                    setChangeStatus={setChangeStatus}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={6} className="emptyList">
                    <img src="/image/no_content_img/no_content.png" />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        {payList.length > 0 ? (
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setList={setPayList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const PayItem = (props) => {
  const pay = props.pay;
  const payStock = pay.payStock;
  const payPrice = pay.payPrice;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const token = window.localStorage.getItem("token");

  const totalPrice = (payStock * payPrice)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const confirmIncome = () => {
    axios
      .post("/pay/confirmIncome", pay, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("상품수령이 확정되었습니다.").then(() => {
            setChangeStatus(!changeStatus);
          });
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <tr>
      <td>{pay.payStringNo}</td>
      <td>{pay.payMemberId}</td>
      <td>{pay.payProductName}</td>
      <td>
        {totalPrice}
        <span> 원</span>
      </td>
      <td>{pay.payPickup}</td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="확정" clickEvent={confirmIncome} />
        </div>
      </td>
    </tr>
  );
};

export default ManageReceive;
