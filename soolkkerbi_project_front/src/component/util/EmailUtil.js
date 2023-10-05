const nodemailer = require("nodemailer")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const transporter = nodemailer.createTransport({
    service: 'gmail', //사용하고자 하는 서비스
    port: 587,
    host: 'smtp.gmail.com',
    secure: true, // true for 587, false for other ports
    requireTLS: true,
    auth: {
        user: 'dldbsk123012301230@gmail.com', // .env 파일 GMAIL_ID 변수 = gmail 주소
        pass: '8740sass(^^)' // .env 파일 GMAIL_PASSWORD 변수 = gmail 패스워드 혹은 2단계 앱인증 사용시 앱 비밀번호
    }
})

const emailUtil = {
    sendEmail: async(email, message) => {
        let number = Math.floor(Math.random() * 1000000) + 100000 // 난수 인증번호 생성
        if (number > 1000000) {
            number = number - 100000;
        }

        await transporter.sendMail({   
            from: process.env.GMAIL_ID, // 보내는 주소 입력
            to: email, // 위에서 선언해준 받는사람 이메일
            subject: `안녕하세요, 술꺼비^^*입니다.`, // 메일 제목
            html: // 내용
                message + 
                `<p>아래의 인증번호를 입력하여 인증을 완료해주세요.</p>` +
                `<b style="font-size:25px; color:blue;">${number}</b>`
        })
        
        return number
    }
}

module.exports = { emailUtil }