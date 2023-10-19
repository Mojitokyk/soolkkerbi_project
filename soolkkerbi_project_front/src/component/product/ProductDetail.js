import { useLocation, useNavigate } from "react-router-dom";
import "./productDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button2, Button3, Button5 } from "../util/Buttons";
import Tab1 from "./Tab1";
import Swal from "sweetalert2";
import * as React from "react";
import ProductModify from "./ProductModify";

const ProductDetail = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const productNo = location.state.productNo;
  const likes = location.state.like;
  const member = location.state.member;
  const [product, setProduct] = useState({});
  const { pathName } = useLocation();
  // console.log("detail", product);
  //상세페이지에 필요한 데이터 가져오기
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    window.scroll(0, 0);

    axios
      .post(
        "/product/view",
        { productNo: productNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.reponse.status);
      });
  }, [likes, pathName]);

  //갯수와 총 금액 state만들기
  const price = Number(product.productPrice);

  // comma붙인 상품가격
  const commmaPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  //props로 useState에 초기값으로 할당하게 되면 App컴포넌트의 parentState가 변경되더라도 totalState는 변함이 없음 -> useState는 한번만 호출되기 때문
  //초기값으로 할당하려면 useEffect를 사용해야함
  useEffect(() => {
    setTotal(price);
  }, [price]);

  //버튼 클릭시 수량 이벤트 작동
  const clickCount = (num) => {
    setQuantity((prev) => prev + num);
    setTotal((prev) => prev + price * num);
    //console.log(quantity, total);
  };

  // comma붙인 total가격
  const commaTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //장바구니에 인서트
  const cart = () => {
    if (isLogin) {
      axios
        .post(
          "/cart/addFromDetail",
          {
            cartProductNo: product.productNo,
            cartPrice: product.productPrice,
            cartStock: quantity,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
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

  //결제창로 이동
  const order = () => {
    const cart = {
      cartProductNo: product.productNo,
      cartPrice: product.productPrice * quantity,
      cartStock: quantity,
      productFilepath: product.productFilepath,
      productName: product.productName,
      productStock: product.productStock,
    };
    if (isLogin) {
      navigate("/product/pay", { state: { cart: cart, member: member } });
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      });
      navigate("/login");
    }
  };
  const navigate = useNavigate();
  //메인으로 이동
  const backHome = () => {
    navigate("/");
  };
  //이전페이지로 이동
  const backPage = () => {
    if (product.productCase === 1) {
      navigate("/product/takju");
    } else if (product.productCase === 2) {
      navigate("/product/yakju");
    } else if (product.productCase === 3) {
      navigate("/product/fruit");
    } else {
      navigate("/product/spirits");
    }
  };

  //좋아요 함수
  const [like, setLike] = useState(likes);
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

  //상품삭제
  const deleteProduct = () => {
    console.log(product.productNo);
    Swal.fire({
      icon: "question",
      title: "삭제",
      text: "상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      const obj = new Object();
      obj.productNo = product.productNo;
      if (res.isConfirmed) {
        axios
          .post("/product/delete", obj)
          .then((res) => {
            if (product.productCase === 1) {
              navigate("/product/takju");
            } else if (product.productCase === 2) {
              navigate("/product/yakju");
            } else if (product.productCase === 3) {
              navigate("/product/fruit");
            } else {
              navigate("/product/spirits");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  return (
    <div className="product-view-all-wrap">
      <div className="product-view-wrap">
        <div className="product-return-page">
          <ul>
            <li onClick={backHome}>
              술꺼비<span className="material-icons">navigate_next</span>
            </li>
            <li onClick={backPage} className="active-backPage">
              {product.productCase === 1
                ? "탁주"
                : product.productCase === 2
                ? "약주/청주"
                : product.productCase === 3
                ? "과실주"
                : "증류주"}
            </li>
          </ul>
        </div>
        <div className="product-view-thumbnail">
          {product.productFilepath === null ? (
            <img src="/image/product_img/no_image.jpg" alt="soldout" />
          ) : product.productStock === 0 ? (
            // <img src="/image/product_img/sold_out.png" />
            <div className="detail-sold-out-wrap">
              <div className="detail-sold-out-image">
                <img
                  src={"/product/" + product.productFilepath}
                  alt="product"
                />
              </div>
              <div className="detail-sold-out">
                <p>SOLD OUT</p>
              </div>
            </div>
          ) : (
            <img src={"/product/" + product.productFilepath} alt="product" />
          )}
        </div>
        <div className="product-view-info">
          <div className="info-title">
            <div>{product.productName}</div>
            <div>
              {commmaPrice} 원<span className="material-icons">star</span>
              <span>{product.starRate}</span>
            </div>
          </div>
          <div className="info-content">
            <ul>
              <li>
                용량 : <span>{product.productLiter}ml</span>
              </li>
              <li>
                도수 : <span>{product.productAlc}%</span>
              </li>
              <li>
                배송 방법 : <span>방문수령 위치확인</span>
              </li>
              <li>
                배송 안내 :{" "}
                <span>방문수령만 가능한 상품입니다. (택배 불가 상품) </span>
              </li>
            </ul>
          </div>
          <div className="product-price-box">
            <div>
              <span>수량</span>
              <span>재고 : {product.productStock} 개</span>
            </div>
            <div className="option-btn-tool">
              <QuantityInput
                quantity={quantity}
                stock={product.productStock}
                onClick={clickCount}
              />
              <div>{commaTotal} 원</div>
            </div>
            <div className="product-total-price">
              <span>총 상품 금액 ({quantity}개)</span>
              <span>{commaTotal} 원</span>
            </div>
          </div>
          {!member || (member && member.memberLevel === 1) ? (
            member && member.memberLevel === 1 ? (
              <div className="product-order-box">
                <ProductModify product={product} setProduct={setProduct} />
                <Button2 text="삭제" clickEvent={deleteProduct} />
              </div>
            ) : (
              ""
            )
          ) : product.productStock === 0 ? (
            <div className="product-order-box">
              <Button5 text="품절된 상품입니다" readOnly />
            </div>
          ) : (
            <div className="product-order-box">
              <Button2 text="구매하기" clickEvent={order} />
              <Button3 text="장바구니" clickEvent={cart} />
              <div className="productDetail-like-btn" onClick={changeLike}>
                <span className="material-icons">
                  {like ? "favorite" : "favorite_border"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="product-detail-tab">
        <Tab1 product={product} />
      </div>
    </div>
  );
};

//수량 버튼 컴포넌트
const QuantityInput = (props) => {
  const onClick = props.onClick;
  const stock = props.stock;
  const quantity = props.quantity;
  return (
    <div className="option-input-tool">
      <button
        className="amount-btn"
        type="button"
        disabled={quantity === 1}
        onClick={() => onClick(-1)}
      >
        <span className="material-icons">remove</span>
      </button>
      <input
        className="amount-input"
        type="number"
        min={1}
        value={quantity}
        max={stock}
        readOnly
      />
      <button
        className="amount-btn"
        type="button"
        disabled={stock < 1 || stock === quantity}
        onClick={() => onClick(1)}
      >
        <span className="material-icons">add</span>
      </button>
    </div>
  );
};
export default ProductDetail;
