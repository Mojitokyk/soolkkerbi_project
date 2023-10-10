import { Routes, Route } from "react-router-dom";
import PartyList from "./PartyList";

const PartyMain = (props) => {
    const isLogin = props.isLogin;
    return (
      <div className="party-all-wrap">
      <div className="party-title">시음회</div>
      <Routes>
        <Route path="*" element={<PartyList isLogin={isLogin} />}></Route>
      </Routes>
      </div>
    );
  };
  
  export default PartyMain;