import { Link } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";

const Cart = (props) => {
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    axios
      .post("/cart/selectCart", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCartList(res.data.cartList);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="cart-all-wrap">
      <div className="cart-title">
        장바구니
        <span className="material-icons">looks_two</span>
      </div>
      <div className="cart-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>
                <input type="checkbox" />
              </td>
              <td width={"50%"} className="info-td">
                상품 정보
              </td>
              <td width={"20%"}>수량</td>
              <td width={"20%"}>주문금액</td>
            </tr>
          </thead>
          <tbody>
            {cartList.map((cart, index) => {
              return <CartProduct key={"cart" + index} cart={cart} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="delete-btn">
        <Button1 text="전체상품 삭제" />
        <Button1 text="선택상품 삭제" />
      </div>
      <CartPrice totalPrice={totalPrice} />
    </div>
  );
};

const CartProduct = (props) => {
  const cart = props.cart;
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td className="info-td">
        <div className="product-img">
          {cart.productFilepath === null ? (
            <img src="/image/product_img/no_image.png" />
          ) : (
            <img src={"/product/" + cart.productFilepath} />
          )}
        </div>
        <div className="product-name">{cart.productName}</div>
        <span className="material-icons">close</span>
      </td>
      <td>
        <div className="product-quantity-wrap">
          <span className="material-icons">add</span>
          <span className="product-quantity">{cart.cartStock}</span>
          <span className="material-icons">remove</span>
        </div>
      </td>
      <td>
        <span className="product-price">{cart.cartPrice}원</span>
        <div className="cart-btn">
          <Button1 text="바로 구매" />
        </div>
      </td>
    </tr>
  );
};

const CartPrice = (props) => {
  const cart = props.cart;
  const totalPrice = props.totalPrice;
  const navigate = useNavigate();
  const allPay = () => {
    navigate("/product/pay");
  };
  return (
    <div className="cart-price-tbl">
      <table>
        <thead>
          <tr>
            <td>
              <span>총 주문 상품 </span>
              <span>2개</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>총 주문금액</p>
              <p className="cart-price">{totalPrice}원</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pay-btn">
        <Button1 text="주문하기" clickEvent={allPay} />
      </div>
      <div className="more-shopping">
        <Link to="/">계속 쇼핑하기</Link>
      </div>
    </div>
  );
};

export default Cart;
