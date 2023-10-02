import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";

const FruitList = (props) => {
  const isLogin = props.isLogin;
  const [fruitList, setFruitList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/product/fruit/" + reqPage)
      .then((res) => {
        setFruitList(res.data.fruitList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="product-all-wrap">
      <div className="product-title">과실주</div>
      <div className="product-list-wrap">
        {fruitList.map((product, index) => {
          return (
            <ProductItem
              key={"fruit" + index}
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

export default FruitList;
