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
  const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1));
  const startDate = new Date(new Date().setDate(new Date().getDate() - 7));
  const [selectDate, setSelectDate] = useState([
    dayjs(startDate),
    dayjs(yesterdayDate),
  ]);

  const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    const startDay = String(startDate.getDate()).padStart(2, "0");
    const start = `${startYear}-${startMonth}-${startDay}`;

    const yesterdayYear = yesterdayDate.getFullYear();
    const yesterdayMonth = String(yesterdayDate.getMonth() + 1).padStart(
      2,
      "0"
    );
    const yesterdayDay = String(yesterdayDate.getDate()).padStart(2, "0");
    const end = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;

    const obj = new Object();
    obj.start = start;
    obj.end = end;

    axios
      .post("/pay/readAllIncome", obj)
      .then((res) => {
        console.log(res.data);
        setIncomeList(res.data);
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
