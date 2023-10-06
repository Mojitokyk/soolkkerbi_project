import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";

const YakjuList = (props) => {
  const isLogin = props.isLogin;
  const [yakjuList, setYakjuList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [member, setMember] = useState({});
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/product/yakju/" + reqPage, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setYakjuList(res.data.yakjuList);
        setPageInfo(res.data.pi);
        setMember(res.data.member);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="product-all-wrap">
      <div className="product-title">약주, 청주</div>
      <div className="product-list-wrap">
        {yakjuList.map((product, index) => {
          return (
            <ProductItem
              key={"yakju" + index}
              product={product}
              isLogin={isLogin}
              member={member}
            />
          );
        })}
      </div>
      <div className="product-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

export default YakjuList;
