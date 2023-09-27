import "./productFrm.css";
import TextEditor from "../util/TextEditor";
import { Button1 } from "../util/Buttons";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ProductFrm = () => {
  return (
    <div className="product-frm-wrap">
      <div className="product-frm-top">
        <div className="product-thumbnail">
          <img src="/image/product_img/takju1.jpg" />
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
                <td className="category">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select>
                      <MenuItem value={1}>탁주</MenuItem>
                      <MenuItem value={2}>약,청주</MenuItem>
                      <MenuItem value={3}>과실주</MenuItem>
                      <MenuItem value={4}>증류주</MenuItem>
                    </Select>
                  </FormControl>
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
                  <label htmlFor="productPrice">상품 가격</label>
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
                  <input type="text" />
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
