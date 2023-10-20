import { useEffect, useState } from "react";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductItem = (props) => {
  const product = props.product;
  const isLogin = props.isLogin;
  const member = props.member;
  const navigate = useNavigate();
  //장바구니 불러오기
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/cart/selectCart", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCartList(res.data.cartList);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [cartList]);
  //좋아요 함수
  const [like, setLike] = useState(product.isLike);
  const token = window.localStorage.getItem("token");
  const changeLike = () => {
    if (isLogin) {
      if (like === 0) {
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
              setLike(1);
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
              setLike(0);
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
      state: { productNo: product.productNo, like: like, member: member },
    });
  };
  //장바구니 넣기
  const addCart = () => {
    //로그인 체크
    if (isLogin) {
      //장바구니에 상품이 있을 때
      if (cartList) {
        let count = 0;
        for (let i = 0; i < cartList.length; i++) {
          if (
            product.productNo === cartList[i].cartProductNo &&
            product.productStock === cartList[i].cartStock
          ) {
            count++;
          }
        }
        //장바구니에 있는 상품이 이미 재고 여유가 없는 경우
        if (count > 0) {
          Swal.fire({
            icon: "warning",
            title: "재고 부족",
            text: "장바구니에 담은 수량이 최대 수량입니다.",
          });
          //재고 여유가 있는 경우
        } else {
          axios
            .post(
              "/cart/addCart",
              {
                cartProductNo: product.productNo,
                cartPrice: product.productPrice,
              },
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
        }
        //장바구니에 상품이 없을 때
      } else {
        axios
          .post(
            "/cart/addCart",
            {
              cartProductNo: product.productNo,
              cartPrice: product.productPrice,
            },
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
      }
      //비로그인 시
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
        {product.productStock === 0 ? (
          product.productFilepath === null ? (
            <div className="sold-out-wrap">
              <div className="sold-out-image">
                <img src="/image/product_img/no_image.jpg" />
              </div>
              <div className="sold-out">
                <p>SOLD OUT</p>
              </div>
            </div>
          ) : (
            <div className="sold-out-wrap">
              <div className="sold-out-image">
                <img src={"/product/" + product.productFilepath} />
              </div>
              <div className="sold-out">
                <p>SOLD OUT</p>
              </div>
            </div>
          )
        ) : product.productFilepath === null ? (
          <img src="/image/product_img/no_image.jpg" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
      </div>
      {isLogin && member && member.memberLevel === 1 ? (
        ""
      ) : (
        <Likes like={like} changeLike={changeLike} isLogin={isLogin} />
      )}
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
            {isLogin && member && member.memberLevel === 1 ? (
              ""
            ) : product.productStock === 0 ? (
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
  const isLogin = props.isLogin;
  const changeLike = props.changeLike;
  return (
    <div className="like-zone" onClick={changeLike}>
      <span className="material-icons">
        {isLogin
          ? like === 1
            ? "favorite"
            : "favorite_border"
          : "favorite_border"}
      </span>
    </div>
  );
};

export default ProductItem;
