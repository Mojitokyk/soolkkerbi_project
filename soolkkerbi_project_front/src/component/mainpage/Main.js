import { useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./main.css";

const Main = () => {
  return <SwiperMain />;
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

const mainList = () => {
  return (
    <div className="product-all-wrap">
      <div className="product-title">탁주</div>
      <div className="product-list-wrap">
        <ProductRecommend />
      </div>
      <div className="product-page"></div>
    </div>
  );
};

const ProductRecommend = () => {
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
  </>;
};
export default Main;
