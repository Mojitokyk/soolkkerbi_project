import "./partyMain.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";

const PartyList = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const [tasteList, setTasteList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    axios
      .get("/taste/list/" + reqPage) //경로에 reqPage 보내줌
      .then((res) => {
        console.log(res.data);
        setTasteList(res.data.tasteList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]); //바꾸고 싶은 정보넣기 reqPage떠라 달라지니가!!
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div>
      {isLogin && member.memberLevel === 1 ? (
        <div className="taste-write-btn">
          <Button2 text="시음회 등록" clickEvent={write} />
        </div>
      ) : (
        ""
      )}

      <div className="taste-list-wrap">
        {tasteList.map((taste, index) => {
          return <TasteItem key={"taste" + index} taste={taste} />;
        })}
      </div>
      <div className="taste-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const TasteItem = (props) => {
  const taste = props.taste;
  const navigate = useNavigate();
  const tasteView = () => {
    navigate("/tasting/view", { state: { tasteNo: taste.tasteNo } });
  };
  return (
    <div className="taste-item" onClick={tasteView}>
      <div className="taste-item-img">
        {taste.tasteFilepath === null ? (
          <img src="/image/default.png" />
        ) : (
          <img src={"/taste/" + taste.tasteFilepath} />
        )}
      </div>
      <div className="taste-item-info">
        <div className="taste-item-title">{taste.tasteTitle}</div>
        <div className="taste-item-startdate">{taste.tasteStart}</div>
        <span>
          <br />~<br />
        </span>
        <div className="taste-item-enddate">{taste.tasteEnd}</div>
      </div>
    </div>
  );
};
export default PartyList;
