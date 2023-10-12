import { Routes, Route } from "react-router-dom";
import PartyList from "./PartyList";
import PartyView from "./PartyView";
import PartyWrite from "./PartyWrite";
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
      <div className="party-title">시음회</div>
      <Routes>
        <Route path="write" element={<PartyWrite isLogin={isLogin} />}></Route>
        <Route
          path="view"
          element={<PartyView isLogin={isLogin} member={member} />}
        ></Route>
        <Route
          path="*"
          element={<PartyList isLogin={isLogin} member={member} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default PartyMain;
