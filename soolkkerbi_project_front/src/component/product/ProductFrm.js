import "./productFrm.css";
import TextEditor from "../util/TextEditor";
import { Button1 } from "../util/Buttons";

const ProductFrm = () => {
  return (
    <div className="product-frm-wrap">
      <div className="product-frm-top">
        <div className="product-thumbnail">
          <img src="/image/product_img/붉은원숭이.jpg" />
        </div>
        <div className="product-info">
          <table className="product-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="productName">상품 이름</label>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productCase">카테고리</label>
                </td>
                <td>
                  <select type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productAlc">도수</label>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productLiter">용량</label>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productPrice">상품가격</label>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productStock">재고량</label>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">상품 이미지</label>
                </td>
                <td>
                  <input />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="product-content-box">
        <TextEditor />
      </div>
      <div className="product-btn-box">
        <Button1 text="등록하기" />
      </div>
    </div>
  );
};

export default ProductFrm;
