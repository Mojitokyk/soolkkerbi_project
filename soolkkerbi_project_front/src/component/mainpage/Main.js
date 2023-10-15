import { useEffect, useState } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./main.css";
import axios from "axios";

const Main = (props) => {
  return (
    <>
      <SwiperMain /> <MainList />
    </>
  );
};

const SwiperMain = () => {
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const toProductView = (productNo) => {
    console.log("페이지 이동 이벤트 클릭");
    console.log(productNo);
    navigate("/product/view", { state: { productNo: productNo } });
  };

  return (
    <div className="main-slide">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        <SwiperSlide>
          <img
            src="/image/main_img/main1_text_51.jpg"
            onClick={() => {
              toProductView(51);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main2_text_105.jpg"
            onClick={() => {
              toProductView(105);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main3_text_122.jpg"
            onClick={() => {
              toProductView(122);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main4_text_125.jpg"
            onClick={() => {
              toProductView(125);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main5_text_52.jpg"
            onClick={() => {
              toProductView(52);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main6_text_96.jpg"
            onClick={() => {
              toProductView(96);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main7_text_91.jpg"
            onClick={() => {
              toProductView(91);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main8_text_108.jpg"
            onClick={() => {
              toProductView(108);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main9_text_111.jpg"
            onClick={() => {
              toProductView(111);
            }}
          ></img>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

//술꺼비 추천
const MainList = () => {
  const [recommendList, setRecommendList] = useState([]);

  //추천 리스트 DB에서 조회
  useEffect(() => {
    axios
      .get("/product/recommendList")
      .then((res) => {
        console.log(res.data);
        setRecommendList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="productR-all-wrap">
      <div className="productR-title">술꺼비 추천</div>
      <div className="productR-list-wrap">
        <ProductRecommend recommendList={recommendList} />
      </div>
      <div className="productR-page"></div>
    </div>
  );
};

const ProductRecommend = (props) => {
  const recommendList = props.recommendList;

  return (
    <>
      {recommendList.map((product, index) => {
        return (
          <div className="productR-item" key={"productR" + index}>
            <div className="productR-item-img">
              <img src={product.img} />
            </div>
            <div className="productR-item-info">
              <div className="productR-item-name">{product.productName}</div>
              <div className="productR-item-price">
                {product.productPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </div>
              <div className="productR-item-more">
                <div className="productR-item-star"></div>
                {/* <div className="productR-item-cart">
                  <span className="material-icons">
                    shopping_cart
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Main;
