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
  const startDate = new Date(today.setDate(today.getDate() - 7));
  const [selectDate, setSelectDate] = useState([
    dayjs(startDate),
    dayjs(todayDate),
  ]);

  const [incomeList, setIncomeList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .post("/pay/readAllIncome", null)
  //     .then((res) => {
  //       const income = new Object();
  //       income.payDate = res.data[0].payDate;
  //       switch (res.data[0].payProductCase) {
  //         case 1:
  //           income.case1 = res.data[0].payPrice;
  //           break;
  //         case 2:
  //           income.case2 = res.data[0].payPrice;
  //           break;
  //         case 3:
  //           income.case3 = res.data[0].payPrice;
  //           break;
  //         case 4:
  //           income.case4 = res.data[0].payPrice;
  //           break;
  //       }
  //       incomeList.push(income);
  //       console.log(incomeList);
  //     })
  //     .catch((res) => {
  //       console.log(res.response.status);
  //     });
  // }, []);

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
                    localeText={{ start: "Check-in", end: "Check-out" }}
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
            <Bar
              dataKey={incomeList.payProductCase}
              stackId="a"
              fill="#ff6289"
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadIncome;
