import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import "./myReservation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button2 } from "../util/Buttons";

import { CalendarModel } from "./CalendarModel";

import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";

const MyReservation = (props) => {
  const member = props.member;
  const [resList, setResList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");
  const [memberId, setMemberId] = useState(member.memberId);
  const [changeStatus, setChangeStatus] = useState(true);
  const [tasteinfo, setTasteinfo] = useState([]);
  const reservationNo = resList.reservationNo;
  const reservationTasteNo = resList.reservationTasteNo;

  useEffect(() => {
    axios
      .get("/reservation/myReservationList/" + reqPage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
       // console.log(res.data);
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
      <div className="my-reservation-tbl">
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
  const member = props.member;
  const changeStatus = props.changeStatus;
  const setChangeStatus = props.setChangeStatus;
  const resList = props.resList;
  const navigate = useNavigate();
  //const [status, setStatus] = useState(resList.reservationStatus === 1 ? true : false);
  const reservationContent = () => {
    navigate("/taste/view", {
      state: { tasteNo: resList.reservationTasteNo },
    });
  };

  const deleteRes = (changeStatus, setChangeStatus) => {
    const member = props.member;
    const reservationNo = resList.reservationNo;

    Swal.fire({
      icon: "question",
      text: "예약을 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "취소하기",
      cancelButtonText: "돌아가기",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/reservation/delete/" + reservationNo)
          .then((res) => {
            //console.log(res.data);
            if (res.data === 1) {
              Swal.fire({
                icon: "success",
                text: "예약이 취소요청이 완료되었습니다.",
              }).then(() => {
                setChangeStatus(!changeStatus);
              });
            }
          })
          .catch((res) => {
           // console.log(res.response.status);
            Swal.fire({
              icon: "error",
              title: "예약 취소 요청 실패",
              text: "잠시후에 다시 시도해주세요.",
            });
          });
      }
    });
  };

  // var today = new Date(),
  // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const nowTime = moment().format("YYYY-MM-DD");


  const reservationDate = moment(resList.reservationDate).format("YYYY-MM-DD");


  return (
    <tr className="my-book-tbl">
      <td>{resList.reservationStringNo}</td>
      <td onClick={reservationContent}>
        <div>{resList.reservationTasteTitle}</div>
      </td>

      {resList.reservationStatus === 3 || reservationDate <= nowTime || resList.reservationStatus === 2 ? (
        <td>
          <div className="date">
            <p>{resList.reservationDate}</p>
          </div>
        </td>
      ) : (
        <td>
          <CalendarModel
            resList={resList}
            setChangeStatus={setChangeStatus}
            changeStatus={changeStatus}
            member={member}
          />
        </td>
      )}

      {/* <td onClick={() => {
        // changeDate(resList);
        <CalendarModel resList={resList}/>
          }}> */}
      {/* {resList.reservationDate}  */}
      {/* <Calendar onChange={onChange} value={value}/> */}
      <td>
        <div className="order-status-btn-box">
          {resList.reservationStatus === 2 ? (
            <div className="cancel">
              <p>취소진행중</p>
            </div>
          ) : resList.reservationStatus === 3 ? (
            <div className="cancel">
              <p>취소 완료</p>
            </div>
          ) : resList.reservationStatus === 1 && reservationDate < nowTime ? (
            <div className="enjoy">
              <p>참석 완료</p>
            </div>
          ) : (
            <Button2
              text="예약취소요청"
              clickEvent={() => {
                deleteRes(changeStatus, setChangeStatus);
              }}
            />
          )}
          {/* {resList.reservationStatus === 2 ? (
             <div className="cancel" >
              <p>취소진행중</p>
             </div>
            ) : (
              <Button2 text="예약취소요청"
              clickEvent={() => {
                deleteRes(changeStatus, setChangeStatus);
              }} />
              
            )} */}
        </div>
      </td>
    </tr>
  );
};

export default MyReservation;
