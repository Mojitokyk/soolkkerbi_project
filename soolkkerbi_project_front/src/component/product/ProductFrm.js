import "./productFrm.css";
import TextEditor from "../util/TextEditor";
import Input from "../util/InputForm";
import { Button1 } from "../util/Buttons";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ProductFrm = (props) => {
  const productName = props.productName;
  const setProductName = props.setProductName;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const productInfo = props.productInfo;
  const setProductInfo = props.setProductInfo;
  const productAlc = props.productAlc;
  const setProductAlc = props.setProductAlc;
  const productLiter = props.productLiter;
  const setProductLiter = props.setProductLiter;
  const productPrice = props.productPrice;
  const setProductPrice = props.setProductPrice;
  const productCase = props.productCase;
  const setProductCase = props.setProductCase;
  const productStock = props.productStock;
  const setProductStock = props.setProductStock;
  const productImg = props.productImg;
  const setProductImg = props.setProductImg;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일 객체 저장
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setProductImg(reader.result);
      };
    } else {
      setThumbnail({});
      setProductImg(null);
    }
  };
  const caseChange = (e) => {
    setProductCase(e.target.value);
  };
  return (
    <div className="product-frm-wrap">
      <div className="product-frm-top">
        <div className="product-thumbnail">
          {productImg === null ? (
            // <img src="/image/product_img/noimage.jpg" />
            <img src="/image/product_img/no_image.jpg" />
          ) : (
            <img src={productImg} />
          )}
        </div>
        <div className="product-info">
          <table className="product-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="productName">상품 이름</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={productName}
                    setData={setProductName}
                    content="productName"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productCase">카테고리</label>
                </td>
                <td className="category">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select value={productCase} onChange={caseChange}>
                      <MenuItem value={1}>탁주</MenuItem>
                      <MenuItem value={2}>약·청주</MenuItem>
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
                  <Input
                    type="text"
                    data={productAlc}
                    setData={setProductAlc}
                    content="productAlc"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productLiter">용량</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={productLiter}
                    setData={setProductLiter}
                    content="productLiter"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productPrice">상품 가격</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={productPrice}
                    setData={setProductPrice}
                    content="productPrice"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productStock">재고량</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={productStock}
                    setData={setProductStock}
                    content="productStock"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">상품 이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="product-content-box">
        <TextEditor
          data={productInfo}
          setData={setProductInfo}
          url="/product/contentImg"
        />
      </div>
      <div className="product-btn-box">
        <Button1 text="등록하기" clickEvent={buttonEvent} />
      </div>
    </div>
  );
};

export default ProductFrm;
