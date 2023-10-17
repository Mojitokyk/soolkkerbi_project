import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import axios from "axios";
import { Button4 } from "../util/Buttons";
import Swal from "sweetalert2";

const CancelReservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/reservation/readAllCancelReservation/" + reqPage)
      .then((res) => {
        setReservationList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.reponse.status);
      });
  }, [reqPage, changeStatus]);

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
              <td width={"35%"}>시음회명</td>
              <td width={"10%"}>취소확정</td>
            </tr>
          </thead>
          <tbody>
            {reservationList.length > 0 ? (
              reservationList.map((reservation, index) => {
                return (
                  <ReservationItem
                    key={"cancelReservation" + index}
                    reservation={reservation}
                    changeStatus={changeStatus}
                    setChangeStatus={setChangeStatus}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={5} className="emptyList">
                    <img src="/image/no_content_img/no_content.png" />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        {reservationList.length > 0 ? (
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setList={setReservationList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const ReservationItem = (props) => {
  const reservation = props.reservation;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const token = window.localStorage.getItem("token");

  const updateReservationStatus = () => {
    axios
      .post("/reservation/updateReservationStatus", reservation, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("예약취소가 완료되었습니다.").then(() => {
            setChangeStatus(!changeStatus);
          });
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <tr>
      <td>{reservation.reservationDate}</td>
      <td>{reservation.reservationStringNo}</td>
      <td>{reservation.reservationMemberId}</td>
      <td>{reservation.reservationTasteTitle}</td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="취소" clickEvent={updateReservationStatus} />
        </div>
      </td>
    </tr>
  );
};

export default CancelReservation;
