import { Routes, Route } from "react-router-dom";
import PartyList from "./PartyList";
import PartyView from "./PartyView";
import PartyWrite from "./PartyWrite";
import PartyModify from "./PartyModify";
import ReservationCalendar from "./ReservationCalendar";
import ReservationConfirm from "./ReservationConfirm";
import ReservationDone from "./ReservationDone";
import axios from "axios";
import { useEffect, useState } from "react";

const PartyMain = (props) => {
  const isLogin = props.isLogin;

  const [member, setMember] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [isLogin]);

  return (
    <div className="party-all-wrap">
      <div className="party-title">
        <h2>시음회</h2>
      </div>
      <Routes>
        <Route path="reservationCalendar" element={<ReservationCalendar />} />
        <Route path="reservationConfirm" element={<ReservationConfirm />} />
        <Route path="reservationDone" element={<ReservationDone />} />
        <Route path="write" element={<PartyWrite isLogin={isLogin} />}></Route>
        <Route
          path="view"
          element={<PartyView isLogin={isLogin} member={member} />}
        ></Route>
        <Route path="modifyTaste" element={<PartyModify />} />
        <Route
          path="*"
          element={<PartyList isLogin={isLogin} member={member} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default PartyMain;
