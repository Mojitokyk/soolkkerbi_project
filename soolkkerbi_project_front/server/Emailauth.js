let nodemailer = require('nodemailer');    //노드메일러 모듈을 사용할 거다!



router.post('/sendEmail', async function (req, res) {


    let user_email = req.body.email;    //받아온거

    console.log(user_email);

    let number = Math.floor(Math.random() * 1000000)+100000; // ★★난수 발생 ★★★★★
    if(number>1000000){                                      // ★★
       number = number - 100000;                             // ★★
    }

    console.log(number);

    // 메일발송 함수

    let transporter = nodemailer.createTransport({
        service: 'gmail'
        , prot: 587
        , host: 'smtp.gmlail.com'
        , secure: false
        , requireTLS: true
        , auth: {
            user: '구글.com'
            , pass: '비밀번호'
        }
    });

    let info = await transporter.sendMail({
        from: '구글@gmail.com',
        to: user_email,         //받아온 이메일 에게
        subject: '인증번호입니다!',
        text: String( number ),        //이 부분은 string값만 보낼수 있다길래
      });                              // 강제로 변경 해줬따


      let checkemail = await new Object();
        checkemail.number = number;        // checkemail 객체를 따로 만들고

     await res.send(checkemail);           // 클라이언트에게 보내기


})