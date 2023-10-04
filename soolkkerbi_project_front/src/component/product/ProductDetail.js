import { useLocation } from "react-router-dom";
import "./productDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
const ProductDetail = (props) => {
  //const isLogin = props.isLogin;
  const location = useLocation();
  const productNo = location.state.productNo;
  const [product, setProduct] = useState([]);
  //사용자를 알기위한 state생성
  //const [member, setMember] = useState(null);
  useEffect(() => {
    axios
      .get("/product/view/" + productNo)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.reponse.status);
      });
  }, []);
  return (
    <div className="product-view-wrap">
      <div className="product-return-page"></div>
      <div className="product-view-thumbnail">
        {product.productFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : product.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
      </div>
      <div className="product-view-info">
        <div className="info-title">
          <div>{product.productName}</div>
          <div>{product.productPrice}원</div>
        </div>
        <div className="info-content">
          <ul>
            <li>
              용량 : <span>{product.productLiter}ml</span>
            </li>
            <li>
              도수 : <span>{product.productAlc}%</span>
            </li>
            <li>
              배송 방법 : <span>방문수령 위치확인</span>
            </li>
            <li>
              배송 안내 :{" "}
              <span>방문수령만 가능한 상품입니다. (택배 불가 상품) </span>
            </li>
          </ul>
        </div>
        <div className="product-price-box">
          <div>수량</div>
        </div>
        <div className="product-order-box">
          <Button2 text="구매하기" />
          <Button3 text="장바구니" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
