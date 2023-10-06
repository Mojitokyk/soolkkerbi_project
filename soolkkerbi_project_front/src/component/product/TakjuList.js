import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";

const TakjuList = (props) => {
  const isLogin = props.isLogin;
  const [takjuList, setTakjuList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/product/takju/" + reqPage, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTakjuList(res.data.takjuList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  return (
    <div className="product-all-wrap">
      <div className="product-title">탁주</div>
      <div className="product-list-wrap">
        {takjuList.map((product, index) => {
          return (
            <ProductItem
              key={"takju" + index}
              product={product}
              isLogin={isLogin}
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

export default TakjuList;
