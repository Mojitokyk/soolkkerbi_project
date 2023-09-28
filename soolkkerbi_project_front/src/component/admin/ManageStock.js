import { useState } from "react";
import "./manageStock.css";
import Pagination from "../common/Pagination";

const ManageStock = () => {
  const [productList, setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  return (
    <div className="manageStock-wrap">
      <div className="manageStock-title">상품재고 관리</div>
      <div className="manageStock-content">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>상품번호</td>
              <td width={"10%"}>상품구분</td>
              <td width={"20%"}>상품명</td>
              <td width={"15%"}>상품가격</td>
              <td width={"25%"}>상품수량</td>
              <td width={"20%"}>수정하기</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

export default ManageStock;
