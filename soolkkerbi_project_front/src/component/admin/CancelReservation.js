import { useState } from "react";
import Pagination from "../common/Pagination";

const CancelReservation = () => {
  const [payList, setPayList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">예약취소 관리</div>
      <div className="admin-content-tbl">
        <table>
          <thead>
            <tr>
              <td width={"20%"}>예약일</td>
              <td width={"20%"}>예약번호</td>
              <td width={"15%"}>예약자</td>
              <td width={"30%"}>시음회명</td>
              <td width={"15%"}>취소확정</td>
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

export default CancelReservation;
