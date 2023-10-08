import "./pay.css";
import { useLocation } from "react-router-dom";
import Input from "../util/InputForm";
import { useState } from "react";
import { Button2 } from "../util/Buttons";

const Pay = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const cart = location.state.cart;
  const cartList = location.state.cartList;
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  return (
    <div className="pay-all-wrap">
      <div className="pay-title">결제하기</div>
      <div className="pay-wrap">
        <div className="left-wrap">
          {cartList ? <CartList cartList={cartList} /> : <Cart cart={cart} />}
          <div className="pay-member-info-wrap">
            <h3>주문자 정보</h3>
            <div className="pay-member-info">
              <Input
                type="text"
                data={memberName}
                setData={setMemberName}
                content="memberName"
                placeholder="이름"
              />
              <Input
                type="text"
                data={memberPhone}
                setData={setMemberPhone}
                content="memberPhone"
                placeholder="연락처"
              />
              <Input
                type="text"
                data={memberEmail}
                setData={setMemberEmail}
                content="memberEmail"
                placeholder="이메일"
              />
            </div>
          </div>
          <div className="pay-pickup-info-wrap">
            <h3>방문 수령 위치</h3>
            <div className="pay-pickup-info">
              <p>술꺼비</p>
              <p>02)1234-5678</p>
              <p>sulkkeobi@iei.or.kr</p>
              <p>서울시 영등포구 선유동2로 57 이레빌딩 19층</p>
              <p>07212</p>
            </div>
            <h3>방문 일자</h3>
            <Input
              type="text"
              data={memberEmail}
              setData={setMemberEmail}
              content="memberEmail"
              placeholder="EX) 2023-10-24 18:00"
            />
          </div>
        </div>
        <div className="right-wrap">
          <div className="pay-summary-wrap">
            <h3>주문 요약</h3>
            <div className="pay-summary">
              <div className="product-price-wrap">
                <span>상품가격</span>
                <span>30100원</span>
              </div>
              <div className="delivery-price-wrap">
                <span>배송비</span>
                <span>방문수령(무료)</span>
              </div>
              <div className="total-price-wrap">
                <span>총 주문금액</span>
                <span>30100원</span>
              </div>
            </div>
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
              <Button2 text="결제하기" />
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
  return (
    <div className="pay-product-info-wrap">
      <h3>주문 상품 정보</h3>
      {cartList.map((cart, index) => {
        console.log(cart.cartPrice);
        //천원 단위 콤마붙인 가격
        const commaPrice = cart.cartPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
          <div className="pay-product-info" key={"cart" + index}>
            <div className="pay-product-img">
              <img src={"/product/" + cart.productFilepath} />
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
  console.log(cart.cartPrice);
  //천원 단위 콤마붙인 가격
  const commaPrice = cart.cartPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className="pay-product-info-wrap">
      <h3>주문 상품 정보</h3>
      <div className="pay-product-info">
        <div className="pay-product-img">
          <img src={"/product/" + cart.productFilepath} />
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
export default Pay;
