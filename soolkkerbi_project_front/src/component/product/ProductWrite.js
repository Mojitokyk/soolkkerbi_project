import ProductFrm from "./ProductFrm";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./productList.css";

const ProductWrite = () => {
  //입력 받을 항목 : 상품 이름, 썸네일, 내용, 도수, 용량, 가격, 카테고리, 재고
  const [productName, setProductName] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [productInfo, setProductInfo] = useState("");
  const [productAlc, setProductAlc] = useState("");
  const [productLiter, setProductLiter] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCase, setProductCase] = useState(1);
  const [productStock, setProductStock] = useState("");
  //productImg -> 썸네일 미리보기용
  const [productImg, setProductImg] = useState(null);
  const navigate = useNavigate();
  //상품 등록 버튼 클릭 시 동작할 함수(서버에 insert요청하는 함수)
  const write = () => {
    if (
      productCase !== "" &&
      productName !== "" &&
      productAlc !== "" &&
      productLiter !== "" &&
      productInfo !== "" &&
      productPrice !== "" &&
      productStock !== ""
    ) {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json을 전송
      //파일이 포함되어 있는 경우 -> FormData를 사용
      const form = new FormData();
      form.append("productName", productName);
      form.append("thumbnail", thumbnail); //첨부파일을 전송하는 경우 file객체를 전송
      form.append("productInfo", productInfo);
      form.append("productAlc", productAlc);
      form.append("productLiter", productLiter);
      form.append("productPrice", productPrice);
      form.append("productCase", productCase);
      form.append("productStock", productStock);
      //const token = window.localStorage.getItem("token");
      axios
        .post("/product/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            //Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              title: "등록 성공",
              text: "상품 등록을 완료했습니다.",
            });
            navigate("/");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "입력값 확인",
        text: "입력하지 않은 값이 있는지 확인해주세요.",
      });
    }
  };
  return (
    <div className="product-insert-all-wrap">
      <div className="product-title">상품 등록</div>
      <ProductFrm
        productName={productName}
        setProductName={setProductName}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        productAlc={productAlc}
        setProductAlc={setProductAlc}
        productLiter={productLiter}
        setProductLiter={setProductLiter}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productCase={productCase}
        setProductCase={setProductCase}
        productStock={productStock}
        setProductStock={setProductStock}
        productImg={productImg}
        setProductImg={setProductImg}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default ProductWrite;
