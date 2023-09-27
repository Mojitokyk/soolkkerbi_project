import ProductFrm from "./ProductFrm";
import "./productList.css";

const ProductWrite = () => {
  return (
    <div className="product-all-wrap">
      <div className="product-title">상품 등록</div>
      <ProductFrm />
    </div>
  );
};

export default ProductWrite;
