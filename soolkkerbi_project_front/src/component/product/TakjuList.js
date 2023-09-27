import "./productList.css";
import { useEffect, useState } from "react";
import axios from "axios";

const TakjuList = (props) => {
  const isLogin = props.isLogin;
  const [takjuList, setTakjuList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/product/takju/list" + reqPage)
      .then((res) => {
        setTakjuList(res.data.takjuList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  return (
    <div>
      <div className="product-list-wrap"></div>
      <div className="product-page"></div>
    </div>
  );
};

export default TakjuList;
