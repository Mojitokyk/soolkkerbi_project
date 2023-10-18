import { useEffect, useState } from "react";
import "./myOrder.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button4, Button5 } from "../util/Buttons";
import * as React from "react";
import ReviewModal from "./ReviewModal";
import Swal from "sweetalert2";

const MyOrder = (props) => {
  const isLogin = props.isLogin;
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [changeStatus, setChangeStatus] = useState(true);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/pay/readOrderList/" + reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setOrderList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">주문내역</div>
      <div className="my-order-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>주문날짜</td>
              <td width={"15%"}>주문번호</td>
              <td width={"30%"} colSpan="2">
                상품명
              </td>
              <td width={"10%"}>수량</td>
              <td width={"10%"}>상품금액</td>
              <td width={"10%"}>처리상태</td>
              <td width={"15%"}>취소/리뷰</td>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 ? (
              orderList.map((order, index) => {
                return (
                  <OrderList
                    key={"order" + index}
                    order={order}
                    setOrderList={setOrderList}
                    changeStatus={changeStatus}
                    setChangeStatus={setChangeStatus}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={8} className="emptyOrder">
                    주문내역이 없습니다
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div>
        {orderList.length > 0 ? (
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setList={setOrderList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
//주문내역 출력하기
const OrderList = (props) => {
  const order = props.order;
  //console.log(order);
  const setOrderList = props.setOrderList;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const payStock = order.payStock;
  const payPrice = order.payPrice;
  //총 금액 구해서 콤마 붙이기
  const totalPrice = payStock * payPrice;
  const commaPrice = totalPrice
    ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  //결제취소요청
  const canclePay = () => {
    //console.log(order.payNo);
    Swal.fire({
      icon: "question",
      title: "결제 취소 요청",
      text: "결제를 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "결제 취소",
      cancelButtonText: "취소",
    }).then((res) => {
      const obj = new Object();
      obj.payNo = order.payNo;
      if (res.isConfirmed) {
        axios
          .post("/pay/cancelPay", obj)
          .then((res) => {
            setChangeStatus(!changeStatus);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  return (
    <tr>
      <td>{order.payDate}</td>
      <td>{order.payStringNo}</td>
      <td>
        {order.payProductFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : order.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + order.payProductFilepath} alt="drink" />
        )}
      </td>
      <td>{order.payProductName}</td>
      <td>{order.payStock}</td>
      <td>{commaPrice}</td>
      <td>
        {order.payStatus === 1
          ? "주문완료"
          : order.payStatus === 2
          ? "수령완료"
          : order.payStatus === 3
          ? "취소중"
          : "결제취소"}
      </td>
      <td>
        {order.payStatus === 1 ? (
          <>
            <div className="order-status-btn-box">
              <Button4
                className="hoverEffect"
                text="취소요청"
                clickEvent={canclePay}
              />
            </div>
          </>
        ) : order.payStatus === 2 ? (
          <>
            <div className="order-status-btn-box">
              <ReviewModal order={order} />
            </div>
          </>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default MyOrder;
