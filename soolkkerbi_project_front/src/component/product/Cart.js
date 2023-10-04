import { Link } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import "./cart.css";

const Cart = () => {
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
            <CartProduct />
            <CartProduct />
          </tbody>
        </table>
      </div>
      <div className="delete-btn">
        <Button1 text="전체상품 삭제" />
        <Button1 text="선택상품 삭제" />
      </div>
      <div className="cart-price-tbl">
        <table>
          <thead>
            <tr>
              <td>
                <span>총 주문 상품 </span>
                <span>1개</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>총 주문금액</p>
                <p className="cart-price">66000원</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="pay-btn">
          <Button1 text="주문하기" />
        </div>
        <div className="more-shopping">
          <Link to="/">계속 쇼핑하기</Link>
        </div>
      </div>
    </div>
  );
};

const CartProduct = () => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td className="info-td">
        <div className="product-img">
          <img src="/image/product_img/takju1.jpg" />
        </div>
        <div className="product-name">양(陽) 막걸리</div>
        <span className="material-icons">close</span>
      </td>
      <td>
        <div className="product-quantity-wrap">
          <span className="material-icons">add</span>
          <span className="product-quantity">1</span>
          <span className="material-icons">remove</span>
        </div>
      </td>
      <td>
        <span className="product-price">33000원</span>
        <div className="cart-btn">
          <Button1 text="바로 구매" />
        </div>
      </td>
    </tr>
  );
};

export default Cart;
