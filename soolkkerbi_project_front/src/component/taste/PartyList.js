import "./partyMain.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Button2 } from "../util/Buttons";
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

      {tasteList.length > 0 ? (
        <>
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
              setList={setTasteList}
            />
          </div>
        </>
      ) : (
        <div className="tast-list-none">진행중인 시음회가 없습니다.</div>
      )}
    </div>
  );
};
const TasteItem = (props) => {
  const taste = props.taste;
  const navigate = useNavigate();

  console.log(taste.tasteStatus);

  const tasteView = () => {
    navigate("/taste/view", { state: { tasteNo: taste.tasteNo } });
  };

  return (
    <div className="taste-item" onClick={tasteView}>
      <div className="taste-item-img">
        {taste.tasteFilepath === null ? (
          <>
            {taste.tasteStatus == 1 ? (
              <img src="/image/product_img/no_taste.jpg" />
            ) : (
              <div className="close-taste-wrap">
                <div className="close-taste-img">
                  <img src="/image/product_img/no_taste.jpg" />
                </div>
                <div className="close-taste">
                  <p>CLOSE</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {taste.tasteStatus == 1 ? (
              <img src={"/taste/" + taste.tasteFilepath} />
            ) : (
              <div className="close-taste-wrap">
                <div className="close-taste-img">
                  <img src={"/taste/" + taste.tasteFilepath} />
                </div>
                <div className="close-taste">
                  <p>CLOSE</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="taste-item-info">
        {taste.tasteStatus == 1 ? (
          <div className="taste-item-title">
            [진행중]
            {taste.tasteTitle}
          </div>
        ) : (
          <div className="taste-item-title">
            [종료]
            {taste.tasteTitle}
          </div>
        )}
        <div className="taste-item-date">
          <span className="taste-item-startdate">{taste.tasteStart}</span>
          <span>~</span>
          <span className="taste-item-enddate">{taste.tasteEnd}</span>
        </div>
      </div>
    </div>
  );
};
export default PartyList;
