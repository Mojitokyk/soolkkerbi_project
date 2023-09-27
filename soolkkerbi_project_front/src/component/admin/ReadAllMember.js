import "./readAllMember.css";

const ReadAllMember = () => {
  return (
    <div className="readAllMember-wrap">
      <div className="readAllMember-title">전체회원목록</div>
      <div className="readAllMember-content">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>회원번호</td>
              <td width={"20%"}>아이디</td>
              <td width={"15%"}>이름</td>
              <td width={"20%"}>전화번호</td>
              <td width={"20%"}>이메일</td>
              <td width={"15%"}>가입일</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadAllMember;
