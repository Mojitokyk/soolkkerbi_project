import { useCallback, useEffect, useState } from "react";
import "./myWishList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyWishList = (props) => {
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("/product/likeList", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">관심 상품</div>
      <div className="my-wish-list">
        {product.length > 0 ? (
          product.map((product, index) => {
            return <LikeList key={"list" + index} product={product} />;
          })
        ) : (
          <div className="emptyWish">조회내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
//좋아요 리스트
const LikeList = (props) => {
  const token = window.localStorage.getItem("token");
  const product = props.product;
  const navigate = useNavigate();
  //상세페이지로 이동
  const move = () => {
    navigate("/product/view", {
      state: { productNo: product.productNo, like: product.productIsLike },
    });
  };
  //마우스이벤트
  const [over, setOver] = useState(false);

  //좋아요 취소
  const removeList = () => {
    axios
      .post(
        "/product/dislike",
        {
          productNo: product.productNo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        navigate("/mypage/wish");
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div
      className="wish-item"
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
    >
      <div className="wish-item-img" onClick={move}>
        {product.productFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : product.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
        {over ? (
          <span className="material-icons deleteWish" onClick={removeList}>
            cancel
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="wish-item-info">
        <div>{product.productName}</div>
      </div>
    </div>
  );
};
export default MyWishList;
