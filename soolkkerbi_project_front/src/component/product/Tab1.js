import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./tab1.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button4 } from "../util/Buttons";
//탭메뉴 mui
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ product }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="상품 안내" {...a11yProps(0)} />
          <Tab label="수령 안내" {...a11yProps(1)} />
          <Tab label="상품 후기" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>수정</div>
        <div
          className="product-detail-info-content"
          dangerouslySetInnerHTML={{ __html: product.productInfo }}
        ></div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PickupInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ProductReview product={product} />
      </CustomTabPanel>
    </Box>
  );
}
//상품후기 게시글
const ProductReview = (props) => {
  const product = props.product;
  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  //객체 만들어서 post로 보내주기
  const obj = new Object();
  obj.productNo = product.productNo;
  useEffect(() => {
    axios
      .post("/review/productReviewList/" + reqPage, obj)
      .then((res) => {
        //console.log(res.data);
        setReviewList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  //리뷰갯수 구해오기
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .post("/review/reviewCount", obj)
      .then((res) => {
        //console.log(res.data);
        setCount(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="product-detail-review-content">
      <div className="review-wrap">
        <div className="review-title">상품후기({count})</div>
        <div className="review-content">
          <table className="review-tbl">
            <thead>
              <tr>
                <th width={"10%"}>번호</th>
                <th width={"40%"}>제목</th>
                <th width={"20%"}>작성자</th>
                <th width={"20%"}>작성일</th>
                <th width={"10%"}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {reviewList.length > 0 ? (
                reviewList.map((review, index) => {
                  return <ReviewItem key={"review" + index} review={review} />;
                })
              ) : (
                <>
                  <tr>
                    <td colSpan={5} className="emptyReview">
                      리뷰내역이 없습니다.
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div>
            {reviewList.length > 0 ? (
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
      </div>
    </div>
  );
};
const ReviewItem = (props) => {
  const review = props.review;
  const [visible, setVisible] = useState(false);
  const obj = new Object();
  obj.reviewNo = review.reviewNo;
  const changeCount = () => {
    setVisible(!visible);
    if (!visible) {
      axios
        .post("/review/updateCount", obj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };
  return (
    <>
      <tr onClick={changeCount} className="tr2">
        <td>{review.reviewNo}</td>
        <td>{review.reviewTitle}</td>
        <td>{review.memberName}</td>
        <td>{review.reviewDate}</td>
        <td>{review.reviewReadCount}</td>
      </tr>
      {visible && (
        <tr>
          <td colSpan={5} className="change-td">
            <div
              className="review-info"
              dangerouslySetInnerHTML={{ __html: review.reviewContent }}
            ></div>
          </td>
        </tr>
      )}
    </>
  );
};
//픽업안내글
const PickupInfo = () => {
  return (
    <div className="product-detail-info-content">
      <div className="pickup-content">
        <div>[방문수령방법]</div>
        <p>
          결제 후 반드시 술꺼비 오프라인 매장에서 신분증 확인 후 수령하셔야 하는
          점 양해 부탁드립니다. (택배 배송은 불가합니다)
        </p>
        <p>
          확인 가능한 신분증 : 주민등록증, 운전면허증, 여권, 장애인등록증 또는
          복지카드, 국가유공자증
        </p>
        <p>
          - 오프라인 매장 주소 : 서울시 영등포구 선유도2로 57 이레빌딩 1층
          술꺼비 오프라인 매장
        </p>
        <p>
          - 운영시간 : 10:00 - 18:00, 월요일 - 금요일 (휴무일 : 토, 일요일,
          공휴일)
        </p>
      </div>
      <div className="pickup-content">
        <div>[How to Pick-Up]</div>
        <p>
          After payment, please note that you must pick up your order at the
          SOOLKKERBI Offline Store after verifying your identity with an
          ID.(Delivery service is not available)
        </p>
        <p>
          - Offline Store Address : 1st floor, 57, Seonyudong 2-ro,
          Yeongdeungpo-gu, Seoul, Republic of Korea
        </p>
        <p>
          - Opening Hours : 10:00 - 18:00, Mon - Fri (Closed : Sat - Sun,
          Holiday)
        </p>
      </div>
      <div className="pickup-content">
        <div>[취소/교환/반품]</div>
        <div>취소, 교환 및 반품이 가능한 경우</div>
        <p>
          - 상품을 공급 받으신 날로부터 7일이내 단, 뚜껑을 개봉하였거나 포장이
          훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.
        </p>
        <p>
          - 공급받으신 상품 및 용역의 내용이 표시, 광고 내용과 다르거나 다르게
          이행된 경우에는 공급받은 날로부터 3개월이내, 그 사실을 알게 된
          날로부터 30일이내
        </p>
        <br></br>
        <div>교환 및 반품이 불가능한 경우</div>
        <p>
          - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손 된 경우. 단,
          상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외
        </p>
        <p>
          - 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우 -
          고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우
        </p>
        <p>
          - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히
          감소한 경우
        </p>
      </div>
      <div className="pickup-content">
        <div>[고객센터 안내]</div>
        <div className="phone-info">
          <span className="material-icons">call</span>
          02-1234-5678
        </div>
        <p>
          상담 운영시간은 10:00 ~ 18:00까지 입니다. (토요일, 일요일 / 공휴일
          휴무)
        </p>
        <p>다른 문의사항은 마이페이지 {">"} 1:1문의로 부탁드립니다.</p>
      </div>
    </div>
  );
};
