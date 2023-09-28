import { useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./main.css";

const Main = () => {
  return (
    <>
      <SwiperMain /> <MainList />
    </>
  );
};

const SwiperMain = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  return (
    <div className="main-slide">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        <SwiperSlide>
          <img src="/image/main_img/main1.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/main_img/main2.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/main_img/main3.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/main_img/main4.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/main_img/main5.jpg"></img>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const MainList = () => {
  const [mainList, setMainList] = useState([]);

  return (
    <div className="productR-all-wrap">
      <div className="productR-title">술꺼비 추천</div>
      <div className="productR-list-wrap">
        <ProductRecommend />; 
      </div>
      <div className="productR-page"></div>
    </div>
  );
};

const ProductRecommend = () => {
  return (
    <>
      <div className="productR-item">
        <div className="productR-item-img">
          <img src="/image/product_img/takju1.jpg" />
        </div>
        <div className="productR-item-info">
          <div className="productR-item-name">양(陽) 막걸리</div>
          <div className="productR-item-price">22000원</div>
          <div className="productR-item-more">
            <div className="productR-item-star"></div>
            <div className="productR-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productR-item">
        <div className="productR-item-img">
          <img src="/image/product_img/takju1.jpg" />
        </div>
        <div className="productR-item-info">
          <div className="productR-item-name">양(陽) 막걸리</div>
          <div className="productR-item-price">22000원</div>
          <div className="productR-item-more">
            <div className="productR-item-star"></div>
            <div className="productR-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productR-item">
        <div className="productR-item-img">
          <img src="/image/product_img/takju1.jpg" />
        </div>
        <div className="productR-item-info">
          <div className="productR-item-name">양(陽) 막걸리</div>
          <div className="productR-item-price">22000원</div>
          <div className="productR-item-more">
            <div className="productR-item-star"></div>
            <div className="productR-item-cart">
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
