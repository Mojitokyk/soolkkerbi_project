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
  const [totalCount, setTotalCount] = useState([]);
  const [checkList, setCheckList] = useState([]);
  //장바구니 조회 및 장바구니 내 합계 금액, 품목 건수 조회
  useEffect(() => {
    axios
      .post("/cart/selectCart", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCartList(res.data.cartList);
        setTotalCount(res.data.totalCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  //개별 상품 체크 박스
  const changeSingleBox = (checked, id) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };
  //전체 선택 체크 박스
  const changeAllBox = (checked) => {
    if (checked) {
      const allCheckBox = [];
      cartList.forEach((el, index) => allCheckBox.push(cartList[index].cartNo));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };
  //선택 상품 삭제
  const deleteCart = () => {
    axios
      .post("/cart/deleteCart", checkList, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCartList(res.data.cartList);
        setTotalCount(res.data.totalCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  // X 클릭 시 개별 상품 삭제
  const deleteOneCart = (cartNo) => {
    axios
      .post(
        "/cart/deleteOneCart",
        { cartNo: cartNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setCartList(res.data.cartList);
        setTotalCount(res.data.totalCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="cart-all-wrap">
      <div className="cart-title">
        장바구니
        <span className="cart-number">
          <em>{totalCount.productNumber}</em>
        </span>
      </div>
      <div className="cart-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>
                <input
                  type="checkbox"
                  onChange={(event) => changeAllBox(event.target.checked)}
                  checked={
                    checkList.length === totalCount.productNumber ? true : false
                  }
                />
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
              return (
                <CartProduct
                  key={"cart" + index}
                  cart={cart}
                  checkList={checkList}
                  changeSingleBox={changeSingleBox}
                  deleteOneCart={deleteOneCart}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="delete-btn">
        <Button1 text="선택상품 삭제" clickEvent={deleteCart} />
      </div>
      <CartPrice totalCount={totalCount} />
    </div>
  );
};

const CartProduct = (props) => {
  const cart = props.cart;
  const checkList = props.checkList;
  const changeSingleBox = props.changeSingleBox;
  const deleteOneCart = props.deleteOneCart;
  return (
    <tr id="cartList">
      <td>
        <input
          type="checkbox"
          onChange={(event) =>
            changeSingleBox(event.target.checked, cart.cartNo)
          }
          checked={checkList.includes(cart.cartNo) ? true : false}
        />
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
        <span
          className="material-icons"
          onClick={() => {
            deleteOneCart(cart.cartNo);
          }}
        >
          close
        </span>
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
  const totalCount = props.totalCount;
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
              <span>총 주문 상품 : </span>
              <span>{totalCount.productNumber}개</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>총 주문금액</p>
              <p className="cart-price">{totalCount.totalPrice}원</p>
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
