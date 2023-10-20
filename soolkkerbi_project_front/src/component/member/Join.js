import { useState } from "react";
import "./join.css";
import Input from "../util/InputForm";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Timer from "./Timer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Join = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  // const [okcheckId, setOkCheckId] = useState(""); 만족시 파란색으로 사용가능?
  const [checkPwMsg, setCheckPWMsg] = useState("");
  const [reqPwMsg, setReqPwMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [checkNameMsg, setCheckNameMsg] = useState("");
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const member = { memberId, memberEmail };
  const [isCodeShow, setIsCodeShow] = React.useState(false);
  const [auth, setAuth] = React.useState("");
  const [checkauth, setCheckAuth] = React.useState("");
  const [changeResult, setChangeResult] = React.useState(false);
  const [btnchange, setBtnchange] = useState(false);
  const [authOk, setAuthOk] = useState(false);

  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,12}$/;
    if (!idReg.test(memberId)) {
      //정구표현식 만족못함
      setCheckIdMsg("아이디는 영어 대소문자숫자로4-8글자입니다!");
    } else {
      //민족->DB중복채크
      axios
        .get("/member/checkId/" + memberId)
        .then((res) => {
          console.log(res);
          if (res.data === 0) {
            setCheckIdMsg("");
          } else {
            setCheckIdMsg("이미사용중인 아이디");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
      setCheckIdMsg("");
    }
  };
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const phoneregExp = /^\d{3}-\d{3,4}-\d{4}$/;
  const nameReg = /^[ㄱ-힣]+$/;
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPWMsg("비밀번호입력 재확인 해주세욥!");
    } else if (memberPw == "") {
      setCheckPWMsg("");
    } else {
      setCheckPWMsg("");
    }
  };
  //최소 8 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
  const pwReqCheck = () => {
    if (!passwordRegEx.test(memberPw)) {
      setReqPwMsg("비밀번호는 문자,숫자 및 하나의 특수문자 최소8자입니다.");
    } else {
      setReqPwMsg("");
    }
  };

  const checkEmail = () => {
    if (!emailRegEx.test(memberEmail)) {
      setCheckEmailMsg("이메일 형식에 맞게 작성해주세요");
    } else {
      setCheckEmailMsg("");
    }
  };
  const checkName = () => {
    if (!nameReg.test(memberName)) {
      setCheckNameMsg("이름은 한글만 기입해주세요");
    } else {
      setCheckNameMsg("");
    }
  };
  const checkPhone = () => {
    if (!phoneregExp.test(memberPhone)) {
      setCheckPhoneMsg("전화번호 양식은 010-0000-0000입니다!");
    } else {
      setCheckPhoneMsg("");
    }
  };
  const join = () => {
    if (
      checkIdMsg === "" &&
      checkPwMsg === "" &&
      checkEmailMsg === "" &&
      reqPwMsg === "" &&
      checkNameMsg === "" &&
      checkPhoneMsg === "" &&
      authOk === ""
    ) {
      const member = {
        memberId,
        memberPw,
        memberName,
        memberPhone,
        memberEmail,
      };
      axios

        .post("/member/join", member)
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              title: "환영합니다.",
              text: "회원가입이 완료되었습니다.",
            });
            navigate("/login");
          } else {
            Swal.fire({
              icon: "error",
              title: "회원가입 실패",
              text: "잠시후에 다시 시도해주세요",
            });
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "입력값을 확인해주세요.",
      });
    }
  };

  const sendEmail = () => {
    const memberEmail = member.memberEmail;
    console.log(memberEmail);
    if (memberEmail === "") {
      Swal.fire({
        icon: "warning",
        text: "이메일을 입력해주세요.",
      });
    } else {
      axios
        .post("/member/auth", { memberEmail })
        .then((res) => {
          console.log(res.data);
          setCheckAuth(res.data);
          setIsCodeShow(true);
          setBtnchange(true);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };

  const authcheck = () => {
    if (auth === checkauth) {
      setChangeResult(true);
      //setCheckAuth("");
      setAuth("");
      setAuthOk(true);
    } else {
      Swal.fire({
        icon: "warning",
        text: "인증번호를 다시 확인해주세요.",
      });
    }
  };

  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      <JoinInputWrap
        data={memberId}
        setData={setMemberId}
        type="text"
        content="memberId"
        label="아이디"
        checkMsg={checkIdMsg}
        blurEvent={idCheck}
      />
      <JoinInputWrap
        data={memberPw}
        setData={setMemberPw}
        type="passWord"
        content="memberPw"
        label="비밀번호"
        checkMsg={reqPwMsg}
        blurEvent={pwReqCheck}
      />
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="passWord"
        content="memberPwRe"
        label="비밀번호확인"
        checkMsg={checkPwMsg}
        blurEvent={pwCheck}
      />
      <JoinInputWrap
        data={memberName}
        setData={setMemberName}
        type="text"
        content="memberName"
        label="이름"
        checkMsg={checkNameMsg}
        blurEvent={checkName}
      />
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="text"
        content="setMemberPhone"
        label="전화번호"
        checkMsg={checkPhoneMsg}
        blurEvent={checkPhone}
      />
      <JoinInputWrap
        className="emailAuth"
        data={memberEmail}
        setData={setMemberEmail}
        type="text"
        content="memberEmail"
        label="이메일"
        checkMsg={checkEmailMsg}
        blurEvent={checkEmail}
      />

      {!authOk ? (
        <>
          <div className="emailAuth">
            <div className="dummyDiv"></div>

            <div className="emailAuthInput">
              <Input
                setData={setAuth}
                data={auth}
                type="type"
                content="auth"
              ></Input>
            </div>
            <div className="authButton">
              {!btnchange ? (
                <Button3 text="인증번호받기" clickEvent={sendEmail} />
              ) : (
                <Button1
                  text="인증하기"
                  clickEvent={() => {
                    authcheck(auth, checkauth);
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={
              "pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red] emailAuthTimer"
            }
          >
            {isCodeShow ? <Timer /> : ""}
          </div>
        </>
      ) : (
        ""
      )}

      {/* <div id="modal-modal-description" sx={{ mt: 2 }}>
           
           <div className="emailauthinput">
             <Input
               setData={setAuth}
               data={auth}
               type="type"
               content="auth"
             ></Input>
           </div>
           <div className="authButton">
             <Button3 text="인증번호받기" clickEvent={sendEmail} />
           </div>
           <div className={'pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red]'}>
             {isCodeShow  ?<Timer />:""}
           </div>
           
         </div>
         <div className="authclear">
             <Button1 text="인증하기"  clickEvent={()=>{authcheck(auth, checkauth)}}/>
           </div> */}

      <div className="join-btn-box">
        <Button1 text="이용약관 확인" clickEvent={handleOpen}></Button1>
        {/* <Button1 text="회원가입" clickEvent={join}></Button1> */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              술꺼비 이용약관안내
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h3>이용약관</h3>
              <div class="modal-content">
                <br />
                <strong>(주)술꺼비 이용약관</strong>
                <br />
                <br />
                <strong>제 1조(목적)</strong>
                <br />
                본 약관은 (주)술꺼비(이하 "회사"라 한다.)에서 운영하는 웹사이트
                술꺼비(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하
                "서비스")를 이용함에 있어 사이트와 이용자간의 권리, 의무 및
                책임사항 및 절차 등을 규정함을 목적으로 합니다.
                <br />
                *PC통신, 스마트폰 앱, 무선 등을 이용하는 전자상거래에 대해서도
                그 성질에 반하지 않는 한 준용합니다.
                <br />
                <br />
                <strong>제2조(용어의 정의)</strong>
                <br />
                ① "사이트"란 회사가 재화·용역을 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하 여 재화·용역을 거래할 수 있도록
                설정한 가상의 영업장 또는 회사가 운영하는 웹사이트를 말하며,
                통합된 하나의 회원 계정(ID 및 비밀번호)을 이용하여 서비스를
                제공받을 수 있는 아래의 사이트를 의미합니다. 아울러 사이트를
                운영하는 사업자의 의미로도 사용합니다.
                <br />
                ② "이용자"란 "사이트”에 접속하여 이 약관에 따라 "사이트"가
                제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                <br />
                ③ “회원”이라 함은 "사이트"에 개인정보를 제공하여 회원등록을 한
                자로서, "사이트"의 정보를 지속적으로 제공받으며, "사이트"가
                제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                <br />
                ④ “비회원”이라 함은 회원에 가입하지 않고 "사이트”가 제공하는
                서비스를 이용하는 자를 말합니다.
                <br />
                ⑤ 위 가항에서 정의되지 않은 이 약관상의 용어의 의미는 일반적인
                거래관행에 의합니다.
                <br />
                <br />
                <strong>제3조 (약관의 명시, 효력 및 변경)</strong>
                <br />
                ① “사이트”는 이 약관의 내용과 상호, 영업소 소재지, 대표자의
                성명, 사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등) 등을
                이용자가 알 수 있도록 “사이트”의 초기 서비스화면(전면)에
                게시합니다.
                <br />
                ② “사이트”는 약관의 규제 등에 관한 법률, 전자거래 기본법,
                전자서명법, 정보통신망 이용촉진등에 관한 법률, 방문판매 등에
                관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이
                약관을 개정할 수 있습니다.
                <br />
                ③ "사이트”가 약관을 개정할 경우에는 적용일자 및 개정사유를
                명시하여 현행 약관과 함께 장터의 초기화면에 그 적용일자 7일
                이전부터 적용일자 전일까지 공지합니다.
                <br />
                ④ "장터"가 약관을 개정할 경우에는 그 개정약관은 그 적용일자
                이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에
                대해서는 개정전의 약관조항이 그대로 적용됩니다.
                <br />
                ⑤ 이 약관은 회사와 회원간에 성립되는 서비스이용계약의
                기본약정입니다. 회사는 필요한 경우 특정 서비스에 관하여 적용될
                사항(이하 "개별약관"이라고 합니다)을 정하여 미리 공지할 수
                있습니다. 회원이 이러한 개별약관에 동의하고 특정 서비스를
                이용하는 경우에는 개별약관이 우선적으로 적용되고, 이 약관은
                보충적인 효력을 갖습니다. 개별약관의 변경에 관해서는 위 ④항을
                준용합니다.
                <br />
                ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
                정부가 제정한 전자거래소비자 보호지침 및 관계법령 또는 상관례에
                따릅니다.
                <br />
                <br />
                <strong>제4조(서비스의 제공 및 변경)</strong>
                <br />
                ① “사이트”는 다음과 같은 업무를 수행합니다.
                <br />
                1. 재화 또는 용역에 대한 정보 제공
                <br />
                2. 기타 “사이트”가 정하는 업무
                <br />
                <br />
                <strong>제5조(서비스의 중단)</strong>
                <br />
                ① "장터"는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장,
                통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을
                일시적으로 중단할 수 있습니다.
                <br />
                ② 제1항에 의한 서비스 중단의 경우에는 "사이트"는 제8조에 정한
                방법으로 이용자에게 통지합니다.
                <br />
                <br />
                <strong>제6조(이용계약의 성립)</strong>
                <br />
                ① 그린북 서비스 이용계약(이하 "이용계약"이라고 합니다)은 그린북
                서비스를 이용하고자 하는 자의 이용신청에 대하여 회사가
                승낙함으로써 성립합니다. ② 이용신청의 방법은 회사가 온라인으로
                제공하는 가입신청양식 중 회원가입란을 이용합니다. 회원 가입은
                제시된 각각의 항목(실명가입, ID)을 채우시면 됩니다.
                <br />
                ③ 비회원으로 그린북 서비스를 이용하기 위해서는 제2항의
                이용신청방법과는 별도로 비회원 인증절차를 거쳐야 합니다
                <br />
                ④ 그린북 서비스를 이용하기 위해서는 본 약관의 내용과 본 약관이
                이용계약의 일부가 됨을 동의하여야 합니다.
                <br />
                <br />
                <strong>제7조(서비스 이용신청)</strong>
                <br />
                ① 서비스를 이용하고자 하는 자는 회사 소정의 가입신청양식을
                제출하여야 합니다. 가입양식에는 다음 각호의 정보가 요구됩니다.
                <br />
                1. 이름
                <br />
                2. 회원 아이디
                <br />
                3. 비밀번호
                <br />
                4. 전화번호
                <br />
                5. 기타 가입신청양식에서 필수적으로 요구하는 사항
                <br />
                ② 이용신청은 반드시 실명으로 하여야 합니다.
                <br />
                <br />
                <strong>제8조(회원가입)</strong>
                <br />
                ① 이용자는 "사이트"가 정한 가입 양식에 따라 회원정보를 기입한 후
                이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                <br />
                ②"사이트"는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중
                다음 각호에 해당하는 경우 회원가입을 승낙하지 아니 합니다.
                <br />
                1. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                <br />
                2. 회원으로 등록하는 것이 "장터"의 기술상 현저히 지장이 있다고
                판단되는 경우
                <br />
                3. 회사가 신청양식에서 정한 회원정보가 미비 되었을 경우
                <br />
                4. 기타 이 약관상의 제반 사항을 위반하며 신청하는 경우
                <br />
                ③ 회원가입계약의 성립시기는 등록을 완료한 시점으로 합니다.
                <br />
                ④ 회원은 제7조 제1항에 의한 등록사항에 변경이 있는 경우, 즉시
                전자우편 기타 방법으로 "장터"에 대하여 그 변경사항을 알려야
                합니다.
                <br />
                <br />
                <strong>제9조(회원 탈퇴 및 자격 상실 등)</strong>
                <br />
                ① 회원 언제든지 회사에 해지의사를 통지함으로써 탈퇴를 할 수
                있습니다. 이 경우 사이트의 탈퇴유예 제도에 의해 3개월 동안은
                개인정보가 남아있습니다. 이는, 신규회원을 위한 FM 충전을 위해
                회원탈퇴/재가입을 반복, 시스템을 악용하는 것을 방지하기
                위함이며, 3개월 이후에는 회원정보가 DB에서 완전히 삭제됩니다.
                <br />
                ② 회원이 다음 각호의 사유에 해당하는 경우, 사이트는 회원자격을
                제한 및 정지시킬 수 있습니다.
                <br />
                1. 가입 신청시에 허위 내용을 등록한 경우
                <br />
                2. 다른 사람의 사이트 이용을 방해하거나 그 정보를 도용하는 등
                전자거래질서를 위협하는 경우
                <br />
                3. 사이트를 이용하여 법령과 이 약관이 금지하거나 미풍 양속에
                반하는 행위를 하는 경우
                <br />
                ③ 사이트가 회원 자격을 제한·정지시킨 후, 동일한 행위가 2회이상
                반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 사이트는
                회원자격을 상실시킬 수 있습니다.
                <br />
                ⑤ 사이트가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
                이 경우 회원에게 이를 통지합니다.
                <br />
                ⑥ 회사는 이용계약의 종료로 인한 손해 또는 손실에 대하여 일체의
                책임을 지지 않습니다
                <br />
                <br />
                <strong>제10조 (회원에 대한 통지)</strong>
                <br />
                ① “사이트” 회원이 회사에 제출한 전자우편을 이용하여 회원에 대한
                통지를 할 수 있습니다.
                <br />
                ② “사이트”는 불특정다수 회원에 대한 통지의 경우 1주일 이상
                사이트 또는 사이트의 게시판 에 게시함으로써 개별 통지를 갈음할
                수 있습니다.
                <br />
                <br />
                <strong>제11조(직거래와 책임 소재)</strong>
                <br />
                "직거래"라 함은 구매를 원하는 사람과 판매를 원하는 판매자 간에
                직접 거래를 하는 행위를 말합니다. "사이트"는 직거래로 인한 어떤
                피해에도 책임을 질 수 없습니다. 만약 피해가 발생했을 경우에는
                해당 당사자에게 책임이 있습니다.
                <br />
                <br />
                <strong>제12조(재화 교환)</strong>
                <br />
                ① "사이트는 이용자가 이미 구매한 재화 또는 용역에 대해 판매자의
                승인 하에 재화 또는 용역을 교환할 수 있습니다. 따라서 교환이
                이루어진 시점에서는 구매자 임의로 교환을 결정할 수 없습니다.
                <br />
                <br />
                <strong>제13조(개인정보보호)</strong>
                <br />
                ① "사이트"는 이용자의 정보수집 시 필요한 최소한의 정보를
                수집합니다. 다음 사항을 필수사항으로 하며 그 외 사항은
                선택사항으로 합니다.
                <br />
                1. 성명
                <br />
                2. 전화번호
                <br />
                3. 희망ID(회원의 경우)
                <br />
                4. 비밀번호(회원의 경우)
                <br />
                5. 전자우편주소(또는 이동전화번호)
                <br />
                ② "사이트"가 이용자의 개인식별이 가능한 개인정보를 수집하는
                때에는 반드시 당해 이용자의 동의를 받습니다.
                <br />
                ③ 제공된 개인정보는 당해 이용자의 동의 없이 목적 외의 이용이나
                제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 “사이트”가
                집니다. 다만, 다음의 경우에는 예외로 합니다.
                <br />
                1. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서
                특정 개인을 식별할 수 없는 형태로 제공하는 경우
                <br />
                2. 도용방지를 위하여 본인확인에 필요한 경우
                <br />
                3. 법률의 규정 또는 법률에 의하여 필요한 불가피한 사유가 있는
                경우
                <br />
                ④ "사이트"가 제2항과 제3항에 의해 이용자의 동의를 받아야 하는
                경우에는 개인정보 보호책임자의 신원(소속, 성명 및 전화번호, 기타
                연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공
                관련사항(제공받은 자, 제공목적 및 제공할 정보의 내용) 등
                정보통신망이용촉진 등에 관한 법률 제22조제2항이 규정한 사항을
                미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할
                수 있습니다.
                <br />
                ⑤ 이용자는 언제든지 "사이트”가 가지고 있는 자신의 개인정보에
                대해 열람 및 오류정정을 요구할 수 있으며 "사이트"는 이에 대해
                지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의
                정정을 요구한 경우에는 "사이트"는 그 오류를 정정할 때까지 당해
                개인정보를 이용하지 않습니다.
                <br />
                ⑥ "사이트”는 개인정보 보호를 위하여 관리자를 한정하여 그 수를
                최소화하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의
                분실, 도난, 유출, 변조 등으로 인한 이용자의 손해에 대하여 모든
                책임을 집니다.
                <br />
                ⑦ "사이트” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의
                수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체
                없이 파기합니다.
                <br />
                <br />
                <strong>제14조(회원의 ID 및 비밀번호에 대한 의무)</strong>
                <br />
                ① ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
                <br />
                ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는
                안됩니다.
                <br />
                ③ 회원이 자신의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고
                있음을 인지한 경우에는 바로 "사이트”에 통보하고 “사이트”의
                안내가 있는 경우에는 그에 따라야 합니다.
                <br />
                <br />
                <strong>제15조(이용자의 의무)</strong>
                <br />
                이용자는 다음 행위를 하여서는 안됩니다.
                <br />
                1. 신청 또는 변경시 허위내용의 등록
                <br />
                2. 타인의 정보 동용
                <br />
                3. "사이트"에 게시된 정보의 변경
                <br />
                4. "사이트"가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신
                또는 게시
                <br />
                5. “사이트”, 기타 제 3자의 저작권 등 지적재산권에 대한 침해
                <br />
                6. "사이트"에 등록한 제3자의 명예를 손상시키거나 업무를 방해하는
                행위
                <br />
                7. 외설 또는 폭력적인 메시지, 화상, 음성 기타 공공질서와
                미풍양속에 반하는 정보를 공개 또는 게시하는 행위
                <br />
                <br />
                <strong>제16조(저작권의 귀속 및 이용제한)</strong>
                <br />
                ① "사이트”가 작성한 저작물에 대한 저작권 기타 지적재산권은
                그린북에 귀속합니다.
                <br />
                ② 이용자는 "사이트”를 이용함으로써 얻은 정보를 "장터"의 사전
                승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여
                영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                <br />
                <br />
                <strong>제17조(분쟁해결)</strong>
                <br />
                ① "사이트”는 이용자가 제기하는 정당한 의견이나 불만을 반영하고
                그 피해를 보상처리하기 위하여 피해보상처리기구를
                설치·운영합니다.
                <br />
                ② "사이트”는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로
                그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는
                이용자에게 그 사유와 처리일정을 즉시 통보하여 드립니다.
                <br />
                ③ "사이트”와 이용자간에 발생한 전자상거래 분쟁과 관련하여
                이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는
                시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
                <br />
                <br />
                <strong>제18조(재판권 및 준거법)</strong>
                <br />
                ① "회사”와 이용자간에 발생한 전자상거래 분쟁에 관한 소송은 제소
                당시의 회사의 주소지 관할 법원으로 합니다.
                <br />
                ② “사이트”와 이용자간에 제기된 전자상거래 소송에는 한국법을
                적용합니다.
                <br />
                <br />
                <strong>*부칙</strong>
                <br />
                1. 이 약관은 2023년 10월 24일부터 적용됩니다.
                <br />
                <br />
              </div>
              <h3>개인정보 수집/이용 안내</h3>
              <div class="modal-content">
                <br />
                <strong>■ 수집하는 개인정보 항목</strong>
                <br />
                <br />
                회사는 개인정보 보호법 제32조에 따라 회원가입, 상담, 서비스 신청
                등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                <br />
                수집항목 : 이름, ID, 암호, 연락처이메일, 주문결제기록, 접속 IP
                정보, 쿠키, 서비스 이용 기록
                <br />
                개인정보 수집방법 : 홈페이지(회원가입), 전화/팩스
                <br />
                <br />
                <strong>■ 개인정보의 수집 및 이용목적</strong>
                <br />
                <br />
                회사는 개인정보를 다음의 목적을 위해 처리합니다. 처리한
                개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용
                목적이 변경될 시에는 사전동의를 구할 예정입니다.
                <br />
                가. 홈페이지 회원가입 및 관리
                <br />
                - 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인,
                서비스 부정이용 방지, 각종 고지·통지, 고충처리, 분쟁 조정을 위한
                기록 보존 등을 목적으로 개인정보를 처리합니다.
                <br />
                나. 민원사무 처리
                <br />
                - 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지,
                처리결과 통보 등을 목적으로 개인정보를 처리합니다.
                <br />
                다. 마케팅 및 광고에의 활용
                <br />
                - 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성
                정보 제공 및 참여기회 제공, 서비스의 유효성 확인 등을 목적으로
                개인정보를 처리합니다.
                <br />
                <br />
                <strong>■ 개인정보의 보유 및 이용기간</strong>
                <br />
                <br />
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                개인정보를 수집시에 동의 받은 개인정보 보유, 이용기간 내에서
                개인정보를 처리, 보유합니다. 각각의 개인정보 처리 및 보유 기간은
                다음과 같습니다.
                <br />
                가. 홈페이지 회원가입 및 관리
                <br />
                - '홈페이지 회원가입 및 관리'와 관련한 개인정보는 수집, 이용에
                관한 동의일로부터 [탈퇴신청 후 3개월] 까지 위 이용목적을 위하여
                보유.이용됩니다.
                <br />
                - 보유근거 : 부정적 거래분쟁의 차단
                <br />
                - 보유기간 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
                <br />
                - 예외사유 : 거래분쟁 소지가 없거나, 재가입시 즉시삭제
                <br />
                나. 민원사무 처리
                <br />
                - '민원사무 처리'와 관련한 개인정보는 수집, 이용에 관한
                동의일로부터 [5년]까지 위 이용목적을 위하여 보유.이용됩니다.
                <br />
                - 보유근거 : 전자상거래등에서의 소비자보호에 관한
                법률(민원발생에 대한 이력관리)
                <br />
                - 보유기간 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 ,
                계약 또는 청약철회 등에 관한 기록 : 5년
                <br />
                - 예외사유 : 거래분쟁 소지가 없는 일반적 내용의 삭제요청
                <br />
                다. 마케팅 및 광고에의 활용
                <br />
                - 보유기간 : 표시/광고에 관한 기록 : 6개월
                <br />
              </div>
              <div className="join-btn-box">
                <Button2
                  text="약관확인 및 회원가입"
                  clickEvent={join}
                ></Button2>
              </div>
              {/* 동의체크박스혀말어? */}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};
export default Join;
