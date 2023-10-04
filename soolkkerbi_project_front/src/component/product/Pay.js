import "./pay.css";

const Pay = () => {
  return (
    <div className="pay-all-wrap">
      <div className="pay-wrap">
        <div className="pay-title">결제하기</div>
        <div className="left-wrap">
          <div className="pay-product-info">
            <h3>주문 상품 정보</h3>
            <div>
              <div className="pay-product-img">
                <img src="/image/product_img/takju1.jpg" />
              </div>
              <div className="pay-product-info">
                <span>양(陽) 막걸리</span>
                <span>1개</span>
                <span>33000원</span>
              </div>
            </div>
          </div>
          <div className="pay-member-info"></div>
          <div className="pay-pickup-info"></div>
        </div>
        <div className="right-wrap"></div>
      </div>
    </div>
  );
};

export default Pay;
