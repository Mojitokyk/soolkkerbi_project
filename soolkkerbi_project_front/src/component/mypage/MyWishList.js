import { useCallback, useEffect, useState } from "react";
import "./myWishList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyWishList = (props) => {
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("/product/likeList", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">관심 상품</div>
      <div className="my-wish-list">
        {product.length > 0 ? (
          product.map((product, index) => {
            return (
              <LikeList
                key={"list" + index}
                product={product}
                setProduct={setProduct}
              />
            );
          })
        ) : (
          <div className="emptyWish">조회내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
//좋아요 리스트
const LikeList = (props) => {
  const token = window.localStorage.getItem("token");
  const product = props.product;
  const setProduct = props.setProduct;
  const navigate = useNavigate();
  //상세페이지로 이동
  const move = () => {
    navigate("/product/view", {
      state: { productNo: product.productNo, like: product.isLike },
    });
  };
  //마우스이벤트
  //const [over, setOver] = useState(false);

  //좋아요 취소
  const removeList = () => {
    //e.preventDefault();
    axios
      .post(
        "/product/dislike",
        {
          productNo: product.productNo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "저장취소",
        });
        setProduct(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  // onMouseOver={() => {
  //   setOver(true);
  // }}
  // onMouseLeave={() => {
  //   setOver(false);
  // }}
  return (
    <div className="wish-item">
      <div className="wish-item-img" onClick={move}>
        {product.productFilepath === null ? (
          <img src="/image/product_img/no_image.png" />
        ) : product.productStock === 0 ? (
          <img src="/image/product_img/sold_out.png" />
        ) : (
          <img src={"/product/" + product.productFilepath} />
        )}
      </div>
      <div className="wish-item-info">
        <div>{product.productName}</div>
        <div className="close-span">
          <span className="material-icons deleteWish" onClick={removeList}>
            close
          </span>
        </div>
      </div>
    </div>
  );
};
export default MyWishList;
