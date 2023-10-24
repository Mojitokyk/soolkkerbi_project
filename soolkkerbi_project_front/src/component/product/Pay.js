import "./pay.css";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../util/InputForm";
import { useState } from "react";
import { Button2 } from "../util/Buttons";
import Swal from "sweetalert2";
import axios from "axios";

const Pay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state.cart;
  const cartList = location.state.cartList;
  const totalPrice = location.state.totalPrice;
  const member = location.state.member;
  const [pickupDate, setPickupDate] = useState("");

  const pay = () => {
    const token = window.localStorage.getItem("token");
    const d = new Date();
    const payStringNo =
      d.getFullYear() +
      "" +
      (d.getMonth() + 1) +
      "" +
      d.getDate() +
      "" +
      d.getHours() +
      "" +
      d.getMinutes() +
      "" +
      d.getSeconds();
    if (pickupDate === "") {
      Swal.fire({
        icon: "warning",
        title: "입력값 확인",
        text: "방문일자를 확인해주세요.",
      });
    } else {
      if (cart) {
        if (cart.cartStock > cart.productStock) {
          Swal.fire({
            icon: "warning",
            title: "재고 부족",
            text: "재고 부족으로 결제할 수 없습니다.",
          });
        } else {
          const { IMP } = window;
          const price = cart.cartPrice;
          const productName = cart.productName;
          IMP.init("imp83034442");
          const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: "주문번호_" + payStringNo,
            name: productName,
            amount: price,
            buyer_email: member.memberEmail,
            buyer_name: member.memberName,
            buyer_tel: member.memberPhone,
          };
          IMP.request_pay(data, callback);

          function callback(response) {
            const { success, error_msg } = response;
            //결제 성공 시
            if (success) {
              //pay테이블 insert : 한 개
              cart.payStringNo = payStringNo;
              cart.pickupDate = pickupDate;
              axios
                .post("/pay/insertOnePay", cart, {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                .then((res) => {
                  if (res.data === 1) {
                    Swal.fire({
                      icon: "success",
                      title: "결제 완료",
                      text: "결제가 완료되었습니다. 마이페이지로 이동합니다.",
                    });
                    navigate("/mypage/order");
                  }
                })
                .catch((res) => {});
            }
            //결제 실패 시
            else {
              Swal.fire({
                icon: "warning",
                title: "결제 취소",
                text: error_msg,
              });
            }
          }
        }
      }
      if (cartList) {
        let count = 0;
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].cartStock > cartList[i].productStock) {
            count++;
          }
        }
        if (count > 0) {
          Swal.fire({
            icon: "warning",
            title: "재고 부족",
            text: "재고 부족으로 결제할 수 없습니다.",
          });
        } else {
          const { IMP } = window;
          const price = totalPrice ? totalPrice : cart.cartPrice;
          const productName =
            cartList.length === 1
              ? cartList[0].productName
              : cartList[0].productName + " 외 " + cartList.length + "건";
          IMP.init("imp83034442");
          const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: "주문번호_" + payStringNo,
            name: productName,
            amount: price,
            buyer_email: member.memberEmail,
            buyer_name: member.memberName,
            buyer_tel: member.memberPhone,
          };
          IMP.request_pay(data, callback);

          function callback(response) {
            const { success, error_msg } = response;
            //결제 성공 시
            if (success) {
              for (let i = 0; i < cartList.length; i++) {
                cartList[i].payStringNo = payStringNo;
                cartList[i].pickupDate = pickupDate;
              }
              //pay테이블 insert : 여러 개
              axios
                .post("/pay/insertPayList", cartList, {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                .then((res) => {
                  if (res.data === 1) {
                    Swal.fire({
                      icon: "success",
                      title: "결제 완료",
                      text: "결제가 완료되었습니다.",
                    });
                    navigate("/mypage/order");
                  }
                })
                .catch((res) => {});
            } else {
              Swal.fire({
                icon: "warning",
                title: "결제 취소",
                text: error_msg,
              });
            }
          }
        }
      }
    }
  };
  return (
    <div className="pay-all-wrap">
      <div className="pay-title">결제하기</div>
      <div className="pay-wrap">
        <div className="left-wrap">
          {cartList ? (
            <CartList cartList={cartList} member={member} />
          ) : (
            <Cart cart={cart} member={member} />
          )}
          <div className="pay-member-info-wrap">
            <h3>주문자 정보</h3>
            <div className="pay-member-info">
              <label htmlFor="memberName">이름</label>
              <input
                type="text"
                value={member.memberName}
                id="memberName"
                readOnly
              />
              <label htmlFor="memberPhone">연락처</label>
              <input
                type="text"
                value={member.memberPhone}
                id="memberPhone"
                readOnly
              />
              <label htmlFor="memberEmail">이메일</label>
              <input
                type="text"
                value={member.memberEmail}
                id="memberEmail"
                readOnly
              />
            </div>
          </div>
          <div className="pay-pickup-info-wrap">
            <h3>방문 수령 위치</h3>
            <div className="pay-pickup-info">
              <p>술꺼비</p>
              <p>02)1234-5678</p>
              <p>sulkkeobi@iei.or.kr</p>
              <p>서울시 영등포구 선유동2로 57 이레빌딩 1층</p>
              <p>07212</p>
            </div>
            <h3>방문 일자 및 시간</h3>
            <Input
              type="text"
              data={pickupDate}
              setData={setPickupDate}
              content="memberEmail"
              placeholder="EX) 2023-10-24 18:00"
            />
          </div>
        </div>
        <div className="right-wrap">
          <div className="pay-summary-wrap">
            <h3>주문 요약</h3>
            <PaySummary cart={cart} totalPrice={totalPrice} />
          </div>
          <div className="pay-info-wrap">
            <h3>결제 안내</h3>
            <div className="pay-info">
              <div className="payment-method">
                <span>결제 수단</span>
                <span>카드 결제</span>
              </div>
              <div className="refund-info">
                <div>품절 시 환불 안내</div>
                <div>
                  <p>결제하신 수단으로 취소합니다.</p>
                  <p>환불 받으신 날짜 기준으로 3-5일(주말 제외) 후</p>
                  <p>결제 대행사에서 직접 고객님의 계좌로 환불처리됩니다.</p>
                </div>
              </div>
              <Button2 text="결제하기" clickEvent={pay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//장바구니에서 전체 상품 주문 시 -> cartList라는 배열로 받음
const CartList = (props) => {
  const cartList = props.cartList;
  const member = props.member;
  const navigate = useNavigate();
  const productView = (productNo, isLike) => {
    navigate("/product/view", {
      state: { productNo: productNo, member: member, like: isLike },
    });
  };
  return (
    <div className="pay-product-info-wrap">
      <h3>주문 상품 정보</h3>
      {cartList.map((cart, index) => {
        //천원 단위 콤마붙인 가격
        const commaPrice = cart.cartPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
          <div className="pay-product-info" key={"cart" + index}>
            <div
              className="pay-product-img"
              onClick={() => {
                productView(cart.cartProductNo, cart.isLike);
              }}
            >
              {cart.productFilepath === null ? (
                <img src="/image/product_img/no_image.jpg" />
              ) : (
                <img src={"/product/" + cart.productFilepath} />
              )}
            </div>
            <div className="pay-product-info-detail">
              <div className="product-detail-name">{cart.productName}</div>
              <div className="product-detail-quantity">{cart.cartStock}개</div>
              <div className="product-detail-price">{commaPrice}원</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
//장바구니에서 개별 상품 주문 시 -> cart라는 객체로 받음
const Cart = (props) => {
  const cart = props.cart;
  const member = props.member;
  const navigate = useNavigate();
  const productView = () => {
    navigate("/product/view", {
      state: {
        productNo: cart.cartProductNo,
        member: member,
        like: cart.isLike,
      },
    });
  };
  //천원 단위 콤마붙인 가격
  const commaPrice = cart.cartPrice
    ? cart.cartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
  return (
    <div className="pay-product-info-wrap">
      <h3>주문 상품 정보</h3>
      <div className="pay-product-info">
        <div className="pay-product-img" onClick={productView}>
          {cart.productFilepath === null ? (
            <img src="/image/product_img/no_image.jpg" />
          ) : (
            <img src={"/product/" + cart.productFilepath} />
          )}
        </div>
        <div className="pay-product-info-detail">
          <div className="product-detail-name">{cart.productName}</div>
          <div className="product-detail-quantity">{cart.cartStock}개</div>
          <div className="product-detail-price">{commaPrice}원</div>
        </div>
      </div>
    </div>
  );
};
//주문 요약
const PaySummary = (props) => {
  const cart = props.cart;
  const totalPrice = props.totalPrice;
  return (
    <div className="pay-summary">
      <div className="product-price-wrap">
        <span>상품가격</span>
        <span>
          {totalPrice
            ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : cart.cartPrice
            ? cart.cartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : ""}
          원
        </span>
      </div>
      <div className="delivery-price-wrap">
        <span>배송비</span>
        <span>방문수령(무료)</span>
      </div>
      <div className="total-price-wrap">
        <span>총 주문금액</span>
        <span>
          {totalPrice
            ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : cart.cartPrice
            ? cart.cartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : ""}
          원
        </span>
      </div>
    </div>
  );
};
export default Pay;
