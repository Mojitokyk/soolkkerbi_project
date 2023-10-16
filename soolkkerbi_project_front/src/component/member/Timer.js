import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./modal.css";

const Timer =()=>{
    const [min, setMin] = useState(3);
    const [sec,setSec] = useState(0);
    const time = useRef(180);
    const timerId = useRef(null);

    useEffect(()=>{
        timerId.current= setInterval(()=>{
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -=1 ;
        } ,1000);

        return()=>
            clearInterval(timerId.current);

    }, []);

    useEffect(()=>{
        if(time.current <= 0) {
            console.log("timeOut");
            clearInterval(timerId.current);

        }
    },[sec]);

    return(
        <div className="timer">
            {min} 분 {sec} 초
        </div>
    )
}
export  default Timer;









/*import { memo, useEffect, useState } from "react";

export const Timer = memo(() => {
    
    const MINUTES_IN_MS = 3 * 60 * 1000;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState<Number>(MINUTES_IN_MS);

    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log('타이머가 종료되었습니다.');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    return (
        <div>
            
             {minutes} : {second} 
        </div>
    );
});


export default Timer;*/
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../modules'

// const AuthTimer = () => {
//   const [time, setTime] = useState(179)
//   const { verification } = useSelector((state: RootState) => state.auth)
//   const { expireAt } = verification.OTP
//   useEffect(() => {
//     if (time > 0) {
//       const Counter = setInterval(() => {
//         const gap = Math.floor((new Date(expireAt).getTime() - new Date().getTime()) / 1000)
//         setTime(gap)
//       }, 1000)
//       return () => clearInterval(Counter)
//     }
//   }, [expireAt, time])
//   const timeFormat = (time: number) => {
//     const m = Math.floor(time / 60).toString()
//     let s = (time % 60).toString()
//     if (s.length === 1) s = `0${s}`
//     return `${m}:${s}`
//   }
//   return (
//     <>
//       <p
//         style={{
//           textAlign: 'right',
//           fontSize: '14px',
//           color: '#ff5252',
//           position: 'absolute',
//           right: '92px',
//           bottom: '14px',
//           letterSpacing: '-0.4px'
//         }}
//       >
//         {timeFormat(time)}
//       </p>
//     </>
//   )
// }

// export default AuthTimer