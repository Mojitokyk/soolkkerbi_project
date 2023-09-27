import { useState } from "react";
import "./myWishList.css";

const MyWishList = () => {
  //const [close, setClose] = useState < boolean > false;
  //const [hide, setHide] = useState < boolean > true;

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">관심 상품</div>
      <div className="my-wish-list">
        <div className="wish-item">
          <div className="wish-item-img">
            <img src="/image/product_img/hondiju.jpg"></img>
            <span className="material-icons deleteWish">cancel</span>
          </div>
          <div className="wish-item-info">
            <div>혼디주</div>
          </div>
        </div>
        <div className="wish-item">
          <div className="wish-item-img">
            <img src="/image/product_img/sul.jpg"></img>
          </div>
          <div className="wish-item-info">
            <div>우렁이쌀 청주</div>
          </div>
        </div>
        <div className="wish-item">
          <div className="wish-item-img">
            <img src="/image/product_img/sul2.jpg"></img>
          </div>
          <div className="wish-item-info">
            <div>삼양춘 탁주</div>
          </div>
        </div>
        <div className="wish-item">
          <div className="wish-item-img">
            <img src="/image/product_img/sul2.jpg"></img>
          </div>
          <div className="wish-item-info">
            <div>삼양춘 탁주</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyWishList;
