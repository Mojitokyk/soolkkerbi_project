import "./productList.css";
import { useNavigate } from "react-router-dom";

const ProductItem = (props) => {
  const product = props.product;
  const navigate = useNavigate();
  const productView = () => {
    navigate("/product/view", { state: { productNo: product.productNo } });
  };
  return (
    <div className="product-item" onClick={productView}>
      <div className="product-item-img">
        {product.productFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : product.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
      </div>
      <div className="product-item-info">
        <div className="product-item-name">{product.productName}</div>
        <div className="product-item-price">
          {product.productPrice}
          <span> 원</span>
        </div>
        <div className="product-item-more">
          <div className="product-item-star">
            <span className="material-icons">star</span>
            <span className="star-rate">{product.starRate}</span>
          </div>
          <div className="product-item-cart">
            <span className="material-icons">shopping_cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
