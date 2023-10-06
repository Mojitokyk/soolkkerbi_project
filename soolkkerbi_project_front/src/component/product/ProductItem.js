import { useState } from "react";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductItem = (props) => {
  const product = props.product;
  const isLogin = props.isLogin;
  const navigate = useNavigate();

  //좋아요 함수
  const [like, setLike] = useState(false);
  const token = window.localStorage.getItem("token");
  const changeLike = () => {
    if (isLogin) {
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
            } else if (res.data === 2) {
              setLike(false);
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      });
      navigate("/login");
    }
  };
  //상품 상세페이지로 이동하는 함수(productNo 전달)
  const productView = () => {
    navigate("/product/view", {
      state: { productNo: product.productNo, like: like },
    });
  };
  const addCart = () => {
    if (isLogin) {
      axios
        .post(
          "/cart/addCart",
          { cartProductNo: product.productNo, cartPrice: product.productPrice },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              title: "담기 완료",
              text: "술주머니로 이동하시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "술주머니",
              cancelButtonText: "계속 쇼핑",
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/cart");
              }
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      });
      navigate("/login");
    }
  };

  // 천원단위 콤마붙인 가격
  const commaPrice = product.productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
          {commaPrice}
          <span> 원</span>
        </div>
        <div className="product-item-more">
          <div className="product-item-star">
            <span className="material-icons">star</span>
            <span className="star-rate">{product.starRate}</span>
          </div>

          <div className="product-item-cart">
            {product.productStock === 0 ? (
              <span className="material-icons soldout">shopping_cart</span>
            ) : (
              <span className="material-icons" onClick={addCart}>
                shopping_cart
              </span>
            )}
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
