import { useEffect, useState } from "react";
import "./myOrder.css";
import axios from "axios";
const MyOrder = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");
  console.log(member.memberNo);
  useEffect(() => {
    axios
      .post("/pay/readOrderList", reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        //setOrderList(res.data.list);
        //setPageInfo(res.data.pi);
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
              <td width={"30%"}>상품명</td>
              <td width={"10%"}>수량</td>
              <td width={"10%"}>상품금액</td>
              <td width={"10%"}>처리상태</td>
              <td width={"15%"}>취소/리뷰</td>
            </tr>
          </thead>
          <tbody>
            <OrderList />
          </tbody>
        </table>
      </div>
    </div>
  );
};
const OrderList = () => {
  return (
    <tr>
      <td></td>
    </tr>
  );
};
export default MyOrder;
