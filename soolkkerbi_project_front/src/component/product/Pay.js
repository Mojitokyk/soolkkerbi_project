import "./pay.css";
import { useLocation } from "react-router-dom";
import Input from "../util/InputForm";
import { useState } from "react";

const Pay = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const cartList = location.state.cartList;
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  console.log(cartList);
  return (
    <div className="pay-all-wrap">
      <div className="pay-wrap">
        <div className="pay-title">결제하기</div>
        <div className="left-wrap">
          <div className="pay-product-info-wrap">
            <h3>주문 상품 정보</h3>
            <div className="pay-product-info">
              <div className="pay-product-img">
                <img src="/image/product_img/takju1.jpg" />
              </div>
              <div className="pay-product-info-detail">
                <div className="product-detail-name">양(陽) 막걸리</div>
                <div className="product-detail-quantity">1개</div>
                <div className="product-detail-price">33000원</div>
              </div>
            </div>
          </div>
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
            <div className="pay-summary"></div>
          </div>
          <div className="pay-info-wrap">
            <h3>결제 안내</h3>
            <div className="pay-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
