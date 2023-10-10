import { Routes, Route } from "react-router-dom";
import PartyList from "./PartyList";

const PartyMain = (props) => {
    const isLogin = props.isLogin;
    return (
      <Routes>
        <Route path="partyList" element={<PartyList isLogin={isLogin} />}></Route>
      </Routes>
    );
  };
  
  export default PartyMain;