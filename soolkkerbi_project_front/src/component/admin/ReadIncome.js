import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Button4 } from "../util/Buttons";

const ReadIncome = () => {
  const todayDate = new Date();
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 6));
  const [selectDate, setSelectDate] = useState([
    dayjs(startDate),
    dayjs(todayDate),
  ]);

  const [incomeList, setIncomeList] = useState([
    {
      payDate: startDate,
      탁주: 4000,
      "약주/청주": 2400,
      증류주: 3600,
      과실주: 2000,
    },
  ]);

  useEffect(() => {
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    const startDay = String(startDate.getDate()).padStart(2, "0");
    const start = `${startYear}-${startMonth}-${startDay}`;

    const todayYear = todayDate.getFullYear();
    const todayMonth = String(todayDate.getMonth() + 1).padStart(2, "0");
    const todayDay = String(todayDate.getDate()).padStart(2, "0");
    const end = `${todayYear}-${todayMonth}-${todayDay}`;

    const obj = new Object();
    obj.start = start;
    obj.end = end;

    axios
      .post("/pay/readAllIncome", obj)
      .then((res) => {
        // const income = new Object();
        // income.payDate = res.data[0].payDate;
        // switch (res.data[0].payProductCase) {
        //   case 1:
        //     income.case1 = res.data[0].payPrice;
        //     break;
        //   case 2:
        //     income.case2 = res.data[0].payPrice;
        //     break;
        //   case 3:
        //     income.case3 = res.data[0].payPrice;
        //     break;
        //   case 4:
        //     income.case4 = res.data[0].payPrice;
        //     break;
        // }
        // incomeList.push(income);
        // console.log(incomeList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  const readAllIncome = () => {};

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">매출현황조회</div>
      <div className="searchDate-btnBox-wrap">
        <div className="searchDate-btnBox-title">조회기간</div>
        <div className="searchDate-btnBox">
          <div className="searchDate-calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DemoItem component="DateRangePicker">
                  <DateRangePicker
                    localeText={{ start: "시작일", end: "종료일" }}
                    value={selectDate}
                    onChange={(newValue) => setSelectDate(newValue)}
                    format="YYYY-MM-DD"
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="searchDate-btn">
            <Button4 text="조회" clickEvent={readAllIncome} />
          </div>
        </div>
      </div>
      <div>
        <ResponsiveContainer width={"100%"} height={600}>
          <BarChart
            data={incomeList}
            margin={{
              top: 50,
              right: 10,
              left: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="payDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={"탁주"} stackId="a" fill="#3D0C11" barSize={50} />
            <Bar
              dataKey={"약주/청주"}
              stackId="a"
              fill="#D80032"
              barSize={50}
            />
            <Bar dataKey={"증류주"} stackId="a" fill="#F78CA2" barSize={50} />
            <Bar dataKey={"과실주"} stackId="a" fill="#F9DEC9" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadIncome;
