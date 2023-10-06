import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";

const SpiritsList = (props) => {
  const isLogin = props.isLogin;
  const [spiritsList, setSpiritsList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/product/spirits/" + reqPage, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setSpiritsList(res.data.spiritsList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="product-all-wrap">
      <div className="product-title">증류주</div>
      <div className="product-list-wrap">
        {spiritsList.map((product, index) => {
          return (
            <ProductItem
              key={"spirits" + index}
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

export default SpiritsList;
