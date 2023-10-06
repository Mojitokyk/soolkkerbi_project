import "./pay.css";
import { useLocation } from "react-router-dom";

const Pay = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const cartList = location.state.cartList;
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
                <div>양(陽) 막걸리</div>
                <div>1개</div>
                <div>33000원</div>
              </div>
            </div>
          </div>
          <div className="pay-member-info"></div>
          <div className="pay-pickup-info"></div>
        </div>
        <div className="right-wrap">
          <div className="pay-pickup1-info"></div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
