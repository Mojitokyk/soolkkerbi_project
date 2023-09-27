import { useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./main.css";

const Main = () => {
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
          <img src="/image/main_img/main1.png"></img>
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

export default Main;
