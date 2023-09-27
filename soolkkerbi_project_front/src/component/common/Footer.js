import { Link } from "react-router-dom";
import "./default.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-top">
          <div className="footer-info">
            <p>
              상호: 술꺼비 / 대표: 이윤수 / 고객센터 02-1234-5678 / E-Mail:
              sulkkeobi@iei.or.kr <br />
              주소: 서울시 당산동 이레빌딩 / 사업자 등록번호: 789-01-4563
            </p>
          </div>
          <div className="footer-logo">
            <Link to="/">
              <img src="/image/logo_png/logo_title.png" />
            </Link>
          </div>
        </div>
        <div className="footer-warning">
          <p>
            술꺼비는 통신판매중개자로서 통신판매 당사자가 아니며 입점 판매사가
            등록한 상품, 거래정보 및 거래에 대하여 일체의 책임을 지지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
