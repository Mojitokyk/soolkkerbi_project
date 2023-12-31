import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";

const ReadAllMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/member/readAllMember/" + reqPage)
      .then((res) => {
        setMemberList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">전체회원 조회</div>
      <div className="admin-content-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>회원번호</td>
              <td width={"20%"}>아이디</td>
              <td width={"15%"}>이름</td>
              <td width={"15%"}>전화번호</td>
              <td width={"20%"}>이메일</td>
              <td width={"20%"}>가입일</td>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => {
              return <MemberItem key={"member" + index} member={member} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          setList={setMemberList}
        />
      </div>
    </div>
  );
};

const MemberItem = (props) => {
  const member = props.member;
  return (
    <tr>
      <td>{member.memberNo}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberEmail}</td>
      <td>{member.memberRegDate}</td>
    </tr>
  );
};

export default ReadAllMember;
