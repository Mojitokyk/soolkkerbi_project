const nodemailer = require('nodemailer');
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const smtpTransport = nodemailer.createTransport({
    
    service: "Naver",
    auth: {
        user: "7yu__na7@naver.com",
        pass: "bo8-sQ2-DPU-uIu"
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  

  module.exports={
      smtpTransport,
      //target: 'node',
    //   plugins: [
    //     new NodePolyfillPlugin()
    // ]
  }