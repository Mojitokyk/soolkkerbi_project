import { useEffect, useState } from "react";
import "./myWishList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyWishList = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const token = window.localStorage.getItem("token");
  const [productList, setProductList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/product/likeList", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setProductList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeStatus]);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">관심 상품</div>
      <div className="my-wish-list">
        {productList.length > 0 ? (
          productList.map((product, index) => {
            return (
              <LikeList
                key={"list" + index}
                product={product}
                changeStatus={changeStatus}
                setChangeStatus={setChangeStatus}
                member={member}
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
  const member = props.member;
  const product = props.product;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const navigate = useNavigate();
  //상세페이지로 이동
  const move = () => {
    navigate("/product/view", {
      state: {
        productNo: product.productNo,
        like: product.isLike,
        member: member,
      },
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
        }).then(() => {
          setChangeStatus(!changeStatus);
        });
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
          //<img src="/image/product_img/sold_out.png" />
          <div className="wish-sold-out-wrap">
            <div className="wish-sold-out-image">
              <img src={"/product/" + product.productFilepath} />
            </div>
            <div className="wish-sold-out">
              <p>SOLD OUT</p>
            </div>
          </div>
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
