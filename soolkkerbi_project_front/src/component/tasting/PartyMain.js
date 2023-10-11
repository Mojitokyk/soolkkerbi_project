import { Routes, Route } from "react-router-dom";
import PartyList from "./PartyList";
import PartyView from "./PartyView";
import PartyWrite from "./PartyWrite";

const PartyMain = (props) => {
    const isLogin = props.isLogin;
    return (
      <div className="party-all-wrap">
      <div className="party-title">시음회</div>
      <Routes>
        <Route path="write" element={<PartyWrite isLogin={isLogin} />}></Route>
        <Route path="view" element={<PartyView isLogin={isLogin} />}></Route>
        <Route path="*" element={<PartyList isLogin={isLogin} />}></Route>
      </Routes>
      </div>
    );
  };
  
  export default PartyMain;