import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FruitList = (props) => {
  const isLogin = props.isLogin;
  const [fruitList, setFruitList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [member, setMember] = useState({});
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/product/fruit/" + reqPage, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFruitList(res.data.fruitList);
        setPageInfo(res.data.pi);
        setMember(res.data.member);
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
          setList={setFruitList}
        />
      </div>
    </div>
  );
};

export default FruitList;
