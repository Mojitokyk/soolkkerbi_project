import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import "./myReservation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Button2 } from "../util/Buttons";




const MyReservation = (props) => {
  const member = props.member;
  const [resList, setResList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const token = window.localStorage.getItem("token");
  const [memberId,setMemberId] = useState(member.memberId);
  useEffect(() => {
    axios
      .get("/reservation/myReservationList/" + reqPage,{
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
        console.log(res.data);
      });
  }, [reqPage]);

  return (
    <div className="mypage-content-wrap">
    <div className="mypage-content-title">예약내역</div>
    <div className="my-order-tbl">
      <table>
        <thead>
          <tr>
            <td width={"10%"}>예약신청번호</td>
            <td width={"30%"} colSpan="2">
            예약한 시움회
            </td>
            <td width={"10%"}>예약날짜번경/취소</td>
            <td width={"15%"}>취소</td>
          </tr>
        </thead>
        <tbody>
          {resList.length > 0 ? (
            resList.map((resList, index) => {
              return <ReservationList key={"resList" + index} resList={resList} />;
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
        />
      ) : (
        ""
      )}
    </div>
  </div>
);
};
const ReservationList = (props) => {
  const resList = props.resList;
  const navigate = useNavigate();
  const [status, setStatus] = useState(resList.reservationStatus === 1 ? true : false);
  const reservationContent = () => {
    navigate("/tasting/view", { state: { reservationNo: resList.reservationNo } });
  };
  const changeStatus = (e) => {
    const reservationNo = resList.reservationNo;
    const checkStatus = e.target.checked;
    const reservationStatus = checkStatus ? 1 : 2;

    //const obj={boardNo : boardNo, boardStatus : boardStatus}
    const obj = { reservationNo, reservationStatus };
    const token = window.localStorage.getItem("token");
    axios
      .post("/reservation/changeStatus", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          setStatus(checkStatus);
        } else {
          Swal.fire("변경중 문제발생");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <tr>
      <td>{resList.reservationStatus}</td>
      <td className="title-td" onClick={reservationContent}>
        <div>{resList.reservationTasteTitle}</div>
      </td>
      <td className="status-td" >
        {resList.reservationDate }
        {/* <Calendar onChange={onChange} value={value}/> */}
      </td>
      <td><div className="order-status-btn-box">
        <Button2 text="예액취소"/>
        </div>
      </td>
    </tr>
  );
};
const changeDate=(props)=>{
  //const navigate = useNavigate();
  const resList = props.resList;
  //const [value, onChange] = useState(new Date());
  return( 
  <Calendar resList={resList}/> 
  )

};


export default MyReservation;
