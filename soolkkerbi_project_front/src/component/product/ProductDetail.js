import { useLocation, useNavigate } from "react-router-dom";
import "./productDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button2, Button3 } from "../util/Buttons";
import Tab1 from "./Tab1";
import Swal from "sweetalert2";

const ProductDetail = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const productNo = location.state.productNo;
  const [product, setProduct] = useState([]);
  //사용자를 알기위한 state생성
  //const [member, setMember] = useState(null);

  //상세페이지에 필요한 데이터 가져오기
  useEffect(() => {
    axios
      .get("/product/view/" + productNo)
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.reponse.status);
      });
  }, []);

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

  //버튼 클릭시 이벤트 작동
  const ClickCount = (num) => {
    setQuantity((prev) => prev + num);
    setTotal((prev) => prev + price * num);
    //console.log(quantity, total);
  };

  // comma붙인 total가격
  const commaTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //결제창로 이동
  const order = () => {};
  //장바구니에 인서트
  const cart = () => {};

  const navigate = useNavigate();
  //메인으로 이동
  const backHome = () => {
    navigate("/");
  };
  //이전페이지로 이동
  const backPage = () => {
    navigate(-1);
  };
  const prevLike = location.state.like;
  //console.log(prevLike);
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다.",
      });
      navigate("/login");
    }
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
                : "증류수"}
            </li>
          </ul>
        </div>
        <div className="product-view-thumbnail">
          {product.productFilepath === null ? (
            <img src="/image/product_img/no_image.png" />
          ) : product.productStock === 0 ? (
            <img src="/image/product_img/sold_out.png" />
          ) : (
            <img src={"/product/" + product.productFilepath} />
          )}
        </div>
        <div className="product-view-info">
          <div className="info-title">
            <div>{product.productName}</div>
            <div>{commmaPrice}원</div>
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
            <div>수량</div>
            <div className="option-btn-tool">
              <QuantityInput
                quantity={quantity}
                stock={product.productStock}
                onClick={ClickCount}
              />
              <div>{commaTotal}원</div>
            </div>
            <div className="product-total-price">
              <span>총 상품 금액({quantity}개)</span>
              <span>{commaTotal}원</span>
            </div>
          </div>
          <div className="product-order-box">
            <Button2 text="구매하기" clickEvent={order} />
            <Button3 text="장바구니" clickEvent={cart} />
            <div className="productDetail-like-btn" onClick={changeLike}>
              {like ? (
                <span className="material-icons">favorite</span>
              ) : (
                <span className="material-icons">favorite_border</span>
              )}
            </div>
          </div>
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
        -
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
        +
      </button>
    </div>
  );
};
export default ProductDetail;
