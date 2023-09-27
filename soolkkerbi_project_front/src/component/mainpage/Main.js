import { useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./main.css";

const Main = () => {
  const [swiper, setSwiper] = useState(null);
  const swiperParams = {
    navigation: true,
    onSwiper: setSwiper,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
  };
  SwiperCore.use([Autoplay]);
  return (
    <div className="main-slide">
      <Swiper {...swiperParams} ref={setSwiper}>
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
