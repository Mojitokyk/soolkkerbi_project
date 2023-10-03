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
                <div className="product-quantity">
                  <span className="material-icons">add</span>1
                  <span className="material-icons">remove</span>
                </div>
              </td>
              <td>
                33000원
                <div className="cart-btn">
                  <Button1 text="바로구매" />
                </div>
              </td>
            </tr>
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
                <div className="product-quantity">
                  <span className="material-icons">add</span>1
                  <span className="material-icons">remove</span>
                </div>
              </td>
              <td>
                33000원
                <div className="cart-btn">
                  <Button1 text="바로구매" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cart-btn">
        <Button1 text="전체상품 삭제" />
        <Button1 text="선택상품 삭제" />
      </div>
    </div>
  );
};

export default Cart;
