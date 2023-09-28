import "./direction.css";

const Direction = () => {
  return (
    <div className="direction-wrap">
      <div className="direction-title">
        <h2>오시는 길</h2>
      </div>
      <div className="direction-warning">
        <p>
          <span>
            *술꺼비는 만 18세 이상의 성인에게만 상품을 판매하고 있습니다.
          </span>
          <br />
          구매 상품 수령시 법적으로 성인임을 증명할 수단(예: 주민등록증,
          운전면허증)을 지참해주시기 바라며,
          <br /> 성인 확인이 불가할 경우 환불처리 됨을 알려드립니다.
        </p>
      </div>
      <div className="pick-up-spot">
        <div className="pick-up-title">
          <h3>구매 주류 수령 장소</h3>
        </div>
        <div className="pick-up-img">
          <img src="/image/main_img/pick_up_spot.jpg" />
        </div>
        <div className="pick-up-info">
          <p>
            서울시 영등포구 선유도2로 57 이레빌딩
            <br />
            1층 술꺼비 오프라인 매장
          </p>
        </div>
      </div>
      <div className="event-spot">
        <div className="event-title">
          <h3>시음회 참여 장소</h3>
        </div>
        <div className="event-img">
          <img src="/image/main_img/event_spot.jpg" />
        </div>
        <div className="event-info">
          <p>
            경기도 남양주시 천마로 163
            <br />
            술꺼비 본사
          </p>
        </div>
      </div>
    </div>
  );
};

export default Direction;
