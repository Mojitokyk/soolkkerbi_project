import { Link } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./cart.css";

const Cart = (props) => {
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");
  //장바구니 리스트
  const [cartList, setCartList] = useState([]);
  //totalCount.productNumber : 장바구니 품목 건수
  //totalCount.totalPrice : 장바구니 총 합계 금액
  const [totalCount, setTotalCount] = useState({});
  const [member, setMember] = useState({});
  //체크 박스 체크 시 cartNo 넣어줌
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
        setMember(res.data.member);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [isLogin]);
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
  //수량 +버튼 클릭 시
  const plusCart = (cartNo, cartStock, productStock) => {
    console.log(cartStock);
    console.log(productStock);
    if (cartStock < productStock) {
      axios
        .post(
          "/cart/plusCart",
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
    }
  };
  //수량 -버튼 클릭 시
  const removeCart = (cartNo, cartStock) => {
    console.log(cartStock);
    if (cartStock > 1) {
      axios
        .post(
          "/cart/removeCart",
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
    }
  };
  return (
    <div className="cart-all-wrap">
      <div className="cart-title">
        장바구니
        <span className="cart-number">{totalCount.productNumber}</span>
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
              <td width={"50%"}>상품 정보</td>
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
                  plusCart={plusCart}
                  removeCart={removeCart}
                  member={member}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="delete-btn">
        <Button1 text="선택상품 삭제" clickEvent={deleteCart} />
      </div>
      <CartPrice totalCount={totalCount} cartList={cartList} member={member} />
    </div>
  );
};

const CartProduct = (props) => {
  const cart = props.cart;
  const checkList = props.checkList;
  const changeSingleBox = props.changeSingleBox;
  const deleteOneCart = props.deleteOneCart;
  const plusCart = props.plusCart;
  const removeCart = props.removeCart;
  const member = props.member;
  const navigate = useNavigate();
  const productView = () => {
    navigate("/product/view", {
      state: {
        productNo: cart.cartProductNo,
        member: member,
        like: cart.isLike,
      },
    });
  };
  // 천원단위 콤마붙인 가격
  const commaPrice = cart.cartPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //바로 구매 버튼 클릭 시 결제페이지 이동
  const partialPay = () => {
    navigate("/product/pay", {
      state: { cart: cart, member: member },
    });
  };
  return (
    <tr>
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
        <div className="product-img" onClick={productView}>
          {cart.productFilepath === null ? (
            <img src="/image/product_img/no_image.jpg" />
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
          <span
            className="material-icons"
            onClick={() => {
              removeCart(cart.cartNo, cart.cartStock);
            }}
          >
            remove
          </span>

          <span className="product-quantity">{cart.cartStock}</span>

          <span
            className="material-icons"
            onClick={() => {
              plusCart(cart.cartNo, cart.cartStock, cart.productStock);
            }}
          >
            add
          </span>
        </div>
      </td>
      <td>
        <span className="product-price">{commaPrice}원</span>
        <div className="cart-btn">
          <Button1 text="바로 구매" clickEvent={partialPay} />
        </div>
      </td>
    </tr>
  );
};

const CartPrice = (props) => {
  const totalCount = props.totalCount;
  const cartList = props.cartList;
  const member = props.member;
  const navigate = useNavigate();
  const allPay = () => {
    if (cartList.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "주문 불가",
        text: "장바구니에 담긴 상품이 없습니다.",
      });
    } else {
      navigate("/product/pay", {
        state: {
          cartList: cartList,
          totalPrice: totalCount.totalPrice,
          member: member,
        },
      });
    }
  };
  // 천원단위 콤마붙인 가격
  const commaPrice = totalCount.totalPrice
    ? totalCount.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
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
              {cartList.length === 0 ? (
                <p className="cart-price">0 원</p>
              ) : (
                <p className="cart-price">{commaPrice}원</p>
              )}
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
