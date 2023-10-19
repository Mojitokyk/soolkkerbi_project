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
  const isLogin = props.isLogin;
  const [member, setMember] = useState({});
  const [isLike, setIsLike] = useState(0);
  const token = window.localStorage.getItem("token");

  //getMember를 수행하여 member값을 각각 SwiperMain, MainList에 전달
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.data);
      });
  }, [isLogin]);

  return (
    <>
      <SwiperMain member={member} isLike={isLike} setIsLike={setIsLike} />
      <MainList member={member} isLike={isLike} setIsLike={setIsLike} />
    </>
  );
};

const SwiperMain = (props) => {
  const member = props.member;
  const isLike = props.isLike;
  const setIsLike = props.setIsLike;

  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const memberId = member.memberId;

  useEffect(() => {
    //메인페이지 번호에 해당하는 product조회(상세페이지로 넘기기 위한 isLike를 구하기 위함)
    const productNoList = [51, 105, 122, 125, 52, 96, 91, 108, 111];
    productNoList.forEach(function (productNoElement, index) {
      console.log(productNoElement);

      axios
        .get("/product/getProductIsLike/" + memberId + "/" + productNoElement)
        .then((res) => {
          console.log(res.data);
          setIsLike(res.data.isLike);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    });
  }, []);

  //제품 상세페이지로 이동
  const toProductView = (productNo, member) => {
    console.log("페이지 이동 이벤트 클릭");
    console.log(productNo);
    navigate("/product/view", {
      state: { productNo: productNo, member: member },
    });
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
              toProductView(51, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main2_text_105.jpg"
            onClick={() => {
              toProductView(105, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main3_text_122.jpg"
            onClick={() => {
              toProductView(122, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main4_text_125.jpg"
            onClick={() => {
              toProductView(125, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main5_text_52.jpg"
            onClick={() => {
              toProductView(52, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main6_text_96.jpg"
            onClick={() => {
              toProductView(96, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main7_text_91.jpg"
            onClick={() => {
              toProductView(91, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main8_text_108.jpg"
            onClick={() => {
              toProductView(108, member, isLike);
            }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/image/main_img/main9_text_111.jpg"
            onClick={() => {
              toProductView(111, member, isLike);
            }}
          ></img>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

//술꺼비 추천
const MainList = (props) => {
  const member = props.member;
  const [recommendList, setRecommendList] = useState([]);

  //추천 리스트 DB에서 조회 -> memberId 값 전달 필요
  const memberId = member.memberId;
  useEffect(() => {
    axios
      .get("/product/recommendList/" + memberId)
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
        <ProductRecommend recommendList={recommendList} member={member} />
      </div>
      <div className="productR-page"></div>
    </div>
  );
};

const ProductRecommend = (props) => {
  const recommendList = props.recommendList;
  const member = props.member;
  const navigate = useNavigate();

  //제품 상세페이지로 이동
  const toProductView = (productNo, isLike, member) => {
    console.log("페이지 이동 이벤트 클릭");
    console.log(productNo);
    navigate("/product/view", {
      state: { productNo: productNo, isLike: isLike, member: member },
    });
  };

  //이미지 경로 삽입(미사용 함수) -> onLoad
  //productInfo에서 img src=""에 해당하는 경로 문자열 추출 및 경로 삽입
  // const productImg = (productInfo) => {
  //   // const productInfo = props.productInfo;
  //   console.log(productInfo);

  //   // .jpg 위치 찾기
  //   const resultSearchJpg = productInfo.toLowerCase().indexOf('.jpg"');
  //   console.log(resultSearchJpg);
  //   const endLocation = resultSearchJpg + 5; //.jpg"가 끝나는 위치

  //   // <img src 위치 찾기
  //   const resultSearchImg = productInfo.toLowerCase().indexOf('<img src="');
  //   console.log(resultSearchImg);
  //   const startLocation = resultSearchImg + 9; // src의 ' " '이 시작하는 위치

  //   //productInfo중 이미지 경로만 문자열로 추출
  //   const imgLocation = productInfo.slice(startLocation, endLocation);
  //   console.log(imgLocation); //성공

  //   document.querySelector(".productR-Img").src = imgLocation;
  // };

  //이미지 경로 삽입2(미사용 함수) -> onLoad
  // const productImg = (productFilepath) => {
  //   const imgLocation = "/product/" + productFilepath;
  //   document.querySelector("productR-img").src = imgLocation;
  // };

  return (
    <>
      {recommendList.map((product, index) => {
        return (
          <div
            className="productR-item"
            key={"productR" + index}
            onClick={() => {
              toProductView(product.productNo, product.isLike, member);
            }}
          >
            <div className="productR-item-img">
              <img src={"/product/" + product.productFilepath} />
            </div>
            <div className="productR-item-info">
              <div className="productR-item-name">{product.productName}</div>
              <div className="productR-item-price">
                {product.productPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Main;
