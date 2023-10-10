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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ReadIncome = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [searchDate, setSearchDate] = useState(dayjs("2023-10-01"));

  useEffect(() => {
    axios
      .post("/pay/readAllIncome", null)
      .then((res) => {
        const income = new Object();
        income.payDate = res.data[0].payDate;
        switch (res.data[0].payProductCase) {
          case 1:
            income.case1 = res.data[0].payPrice;
            break;
          case 2:
            income.case2 = res.data[0].payPrice;
            break;
          case 3:
            income.case3 = res.data[0].payPrice;
            break;
          case 4:
            income.case4 = res.data[0].payPrice;
            break;
        }
        incomeList.push(income);
        console.log(incomeList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">매출현황조회</div>
      <div className="searchDate-btnBox-wrap">
        <div className="searchDate-btnBox-title">조회기간</div>
        <div className="searchDate-btnBox">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                defaultValue={dayjs("2023-10-01")}
                format="YYYY-MM-DD"
              />
              <DatePicker
                format="YYYY-MM-DD"
                value={searchDate}
                onChange={(newValue) => setSearchDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
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
