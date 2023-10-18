import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextEditor from "../util/TextEditor";
import { Button1, Button3 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductFrm from "./ProductFrm";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 20,
  p: 7,
};

export default function ProductModify(props) {
  const product = props.product;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //모달용
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //취소버튼 누르면 창 모달창 꺼지기
  const clickCancle = () => {
    setOpen(false);
  };
  //기존에 입력했던 자료들을 useState()에 저장
  //console.log(product);
  //console.log(props.product.productName);
  const [productName, setProductName] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [productInfo, setProductInfo] = useState("");
  const [productAlc, setProductAlc] = useState("");
  const [productLiter, setProductLiter] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCase, setProductCase] = useState(1);
  const [productStock, setProductStock] = useState("");
  //썸네일 미리보기용
  const [productImg, setProductImg] = useState(null);
  useEffect(() => {
    setProductName(product.productName);
    setProductInfo(product.productInfo);
    setProductAlc(product.productAlc);
    setProductLiter(product.productLiter);
    setProductPrice(product.productPrice);
    setProductCase(product.productCase);
    setProductStock(product.productStock);
    setProductImg(product.productFilepath);
    setThumbnail(product.productFilepath);
  }, [product]);
  // console.log(product.productNo);
  //상품 수정 함수
  const modify = () => {
    if (
      productCase !== "" &&
      productName !== "" &&
      productAlc !== "" &&
      productLiter !== "" &&
      productInfo !== "" &&
      productPrice !== "" &&
      productStock !== ""
    ) {
      const form = new FormData();
      form.append("productName", productName);
      form.append("thumbnail", thumbnail);
      form.append("productInfo", productInfo);
      form.append("productAlc", productAlc);
      form.append("productLiter", productLiter);
      form.append("productPrice", productPrice);
      form.append("productCase", productCase);
      form.append("productStock", productStock);
      form.append("productFilepath", productImg);
      form.append("productNo", product.productNo);
      axios
        .post("/product/update", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              title: "수정 성공",
              text: "상품 수정을 완료했습니다.",
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
    <div className="product-modify">
      <Button onClick={handleOpen}>수정</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div id="modal-title">
            <div>상품 수정</div>
            <span className="material-icons" onClick={clickCancle}>
              close
            </span>
          </div>
          <div className="product-form">
            <div id="modal-description">
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
                buttonEvent={modify}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
{
  /* <div className="product-order-box">
<Button3 text="취소" clickEvent={clickCancle} />
<Button1 text="등록" clickEvent={modify} />
</div> */
}
