import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import ProductItem from "./ProductItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const YakjuList = (props) => {
  const isLogin = props.isLogin;
  const [yakjuList, setYakjuList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [member, setMember] = useState({});
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

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
        if (res.respons.status === 500) {
          Swal.fire({
            icon: "error",
            title: "서비스 요청 지연",
            text: "서버요청이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
          });
          navigate("/");
        }
      });
  }, [reqPage]);

  return (
    <div className="product-all-wrap">
      <div className="product-title">약·청주</div>
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
          setList={setYakjuList}
        />
      </div>
    </div>
  );
};

export default YakjuList;
