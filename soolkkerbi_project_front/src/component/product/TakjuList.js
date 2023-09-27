import "./productList.css";

const TakjuList = () => {
  return (
    <div className="product-all-wrap">
      <div className="product-title">탁주</div>
      <div className="product-list-wrap">
        <ProductItem />
      </div>
      <div className="product-page"></div>
    </div>
  );
};

const ProductItem = () => {
  return (
    <>
      <div className="product-item">
        <div className="product-item-img">
          <img src="/image/product_img/막쿠르트.jpg" />
        </div>
        <div className="product-item-info">
          <div className="product-item-name">양(陽) 막걸리</div>
          <div className="product-item-price">22000원</div>
          <div className="product-item-more">
            <div className="product-item-star">
              <span className="material-icons">star</span>
              <span className="star-rate">4</span>
            </div>
            <div className="product-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-item">
        <div className="product-item-img">
          <img src="/image/product_img/술취한원숭이.jpg" />
        </div>
        <div className="product-item-info">
          <div className="product-item-name">양(陽) 막걸리</div>
          <div className="product-item-price">22000원</div>
          <div className="product-item-more">
            <div className="product-item-star">
              <span className="material-icons">star</span>
              <span className="star-rate">4</span>
            </div>
            <div className="product-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-item">
        <div className="product-item-img">
          <img src="/image/product_img/붉은원숭이.jpg" />
        </div>
        <div className="product-item-info">
          <div className="product-item-name">양(陽) 막걸리</div>
          <div className="product-item-price">22000원</div>
          <div className="product-item-more">
            <div className="product-item-star">
              <span className="material-icons">star</span>
              <span className="star-rate">4</span>
            </div>
            <div className="product-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-item">
        <div className="product-item-img">
          <img src="/image/product_img/복순도가.jpg" />
        </div>
        <div className="product-item-info">
          <div className="product-item-name">양(陽) 막걸리</div>
          <div className="product-item-price">22000원</div>
          <div className="product-item-more">
            <div className="product-item-star">
              <span className="material-icons">star</span>
              <span className="star-rate">4</span>
            </div>
            <div className="product-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-item">
        <div className="product-item-img">
          <img src="/image/product_img/막걸리.jpg" />
        </div>
        <div className="product-item-info">
          <div className="product-item-name">
            양(陽) 막걸리
            야야야야야어리ㅏ어ㅣ츹,ㅡ치더랴더시ㅏ얼피아아ㅣㅇ리ㅓㅏㅇ리ㅏ
          </div>
          <div className="product-item-price">22000원</div>
          <div className="product-item-more">
            <div className="product-item-star">
              <span className="material-icons">star</span>
              <span className="star-rate">4</span>
            </div>
            <div className="product-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TakjuList;
