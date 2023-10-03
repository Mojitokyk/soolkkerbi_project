import { useEffect, useState } from "react";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductItem = (props) => {
  const product = props.product;
  const isLogin = props.isLogin;
  const navigate = useNavigate();
  //상품 상세페이지로 이동하는 함수(productNo 전달)
  const productView = () => {
    navigate("/product/view", { state: { productNo: product.productNo } });
  };
  //좋아요 함수
  const [like, setLike] = useState(false);
  const token = window.localStorage.getItem("token");
  const changeLike = () => {
    if (!like) {
      axios
        .post(
          "/product/like",
          { productNo: product.productNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            setLike(true);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      axios
        .post(
          "/product/dislike",
          { productNo: product.productNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            setLike(false);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };

  return (
    <div className="product-item">
      <div className="product-item-img" onClick={productView}>
        {product.productFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : product.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
      </div>
      <Likes like={like} changeLike={changeLike} />
      <div className="product-item-info">
        <div className="product-item-name">{product.productName}</div>
        <div className="product-item-price">
          {product.productPrice}
          <span> 원</span>
        </div>
        <div className="product-item-more">
          <div className="product-item-star">
            <span className="material-icons">star</span>
            <span className="star-rate">{product.starRate}</span>
          </div>
          <div className="product-item-cart">
            <span className="material-icons">shopping_cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Likes = (props) => {
  const like = props.like;
  const changeLike = props.changeLike;
  return (
    <div className="like-zone" onClick={changeLike}>
      <span className="material-icons">
        {like ? "favorite" : "favorite_border"}
      </span>
    </div>
  );
};

export default ProductItem;
