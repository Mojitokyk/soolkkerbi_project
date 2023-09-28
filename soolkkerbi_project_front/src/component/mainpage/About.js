import "./about.css";

const About = () => {
  return (
    <div className="about-wrap">
      <div className="about-title">
        <h1>술 꺼 비</h1>
      </div>
      <div className="about-img1">
        <img src="/image/main_img/about1.jpg" />
      </div>
      <div className="about-content">
        <div className="about-content-ko">
          <div className="about-ko-title">
            <h2>술 꺼 비</h2>
          </div>
          <div className="about-ko-content">
            <p>
              국내에서 직접 생산되는 70가지가 넘는 전통주를 판매합니다.
              <br />
              역사와 문화가 담겨있는 다양한 전통주를 한 곳에서 만나보세요.
              <br />
              술꺼비에서만 만나볼 수 있는 특색있는 전통주로 가득한 공간으로
              여러분을 초대합니다.
            </p>
          </div>
        </div>
        <div className="about-content-en">
          <div className="about-en-title">
            <h2>Sul Kkeo Bi</h2>
          </div>
          <div className="about-en-content">
            <p>
              It sells more than 70 kinds of traditional liquor produced
              directly in Korea.
              <br />
              Meet a variety of traditional liquor with history and culture in
              one place.
              <br />
              We invite you to a space filled with unique traditional liquor
              that can only be found in Sulkkeobi.
            </p>
          </div>
        </div>
      </div>
      <div className="about-img2">
        <img src="/image/main_img/about2.jpg" />
      </div>
    </div>
  );
};

export default About;
