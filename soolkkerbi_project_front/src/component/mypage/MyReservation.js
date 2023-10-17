import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import "./myReservation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button2 } from "../util/Buttons";

import { CalendarModel, CustomCalendar } from "./CalendarModel";

const MyReservation = (props) => {
  const member = props.member;
  const [resList, setResList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");
  const [memberId, setMemberId] = useState(member.memberId);
  const [changeStatus, setChangeStatus] = useState(true);

  useEffect(() => {
    axios
      .get("/reservation/myReservationList/" + reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResList(res.data.myReservationList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, changeStatus]);

  return (
    <div className="mypage-content-wrap">
      <div className="mypage-content-title">예약내역</div>
      <div className="my-order-tbl">
        <table>
          <thead>
            <tr>
              <td width={"20%"}>예약신청번호</td>
              <td width={"40%"}>예약한 시음회</td>
              <td width={"20%"}>예약날짜변경</td>
              <td className="content-btn" width={"20%"}>
                취소
              </td>
            </tr>
          </thead>
          <tbody>
            {resList.length > 0 ? (
              resList.map((resList, index) => {
                return (
                  <ReservationList
                    key={"resList" + index}
                    resList={resList}
                    setChangeStatus={setChangeStatus}
                    changeStatus={changeStatus}
                  />
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={8} className="emptyOrder">
                    예약내역이 없습니다
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    <div>
      {resList.length > 0 ? (
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          setList={setResList}
        />
      ) : (
        ""
      )}
    </div>
    </div>

);

};

const ReservationList = (props) => {
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const resList = props.resList;
  const navigate = useNavigate();
  //const [status, setStatus] = useState(resList.reservationStatus === 1 ? true : false);
  const reservationContent = () => {
    navigate("/tasting/view", {
      state: { reservationNo: resList.reservationNo },
    });
  };
  // const changeStatus = (e) => {
  //   const reservationDate = resList.reservationDate;
  //   const reservationNo = resList.reservationNo;
  //   const checkStatus = e.target.checked;
  //   const reservationStatus = checkStatus ? 1 : 2;

  //   //const obj={boardNo : boardNo, boardStatus : boardStatus}
  //   const obj = { reservationNo, reservationStatus };
  //   const token = window.localStorage.getItem("token");
  //      axios
  //     .post("/reservation/changeStatus", obj, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data === 1) {
  //         setStatus(checkStatus);
  //       } else {
  //         Swal.fire("변경중 문제발생");
  //       }
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });

  // };

  // const changeDate=(resList)=>{
  //   //const navigate = useNavigate();
  //   console.log(resList);
  //   //const [value, onChange] = useState(new Date());
  //   return(
  //   <Calendar resList={resList}/>
  //   )

  // };
  const deleteRes = (changeStatus, setChangeStatus) => {
    const member = props.member;
    const reservationNo = resList.reservationNo;

    Swal.fire({
      icon: "warning",
      text: "예약을 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "취소하기",
      cancelButtonText: "돌아가기",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/reservation/delete/" + reservationNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              Swal.fire("예약이 취소되었습니다.").then(() => {
                setChangeStatus(!changeStatus);
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
            Swal.fire("예약취소중 문제 발생");
          });
      }
    });
  };

  return (
    <tr>
      <td>{resList.reservationStringNo}</td>
      <td onClick={reservationContent}>
        <div>{resList.reservationTasteTitle}</div>
      </td>
      <td>
        <CalendarModel
          resList={resList}
          setChangeStatus={setChangeStatus}
          changeStatus={changeStatus}
        />
        {/* <td onClick={() => {
        // changeDate(resList);
        <CalendarModel resList={resList}/>
          }}> */}
        {/* {resList.reservationDate}  */}
        {/* <Calendar onChange={onChange} value={value}/> */}
      </td>
      <td>
        <div className="order-status-btn-box">
          <Button2
            text="예약취소"
            clickEvent={() => {
              deleteRes(changeStatus, setChangeStatus);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default MyReservation;
