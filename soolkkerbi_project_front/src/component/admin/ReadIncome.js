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
import { FaSquareFull } from "react-icons/fa";

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
        setIncomeList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  const readAllIncome = () => {
    const obj = new Object();
    const start = document.querySelectorAll(".MuiInputBase-input")[0].value;
    const end = document.querySelectorAll(".MuiInputBase-input")[1].value;
    obj.start = start;
    obj.end = end;

    axios
      .post("/pay/readAllIncome", obj)
      .then((res) => {
        setIncomeList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">매출현황 조회</div>
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
                    id={'"start"'}
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
      <div className="incomeChart-wrap">
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
            <XAxis dataKey="incomeDate" />
            <YAxis
              type="number"
              label={{ value: "원", offset: 30, position: "top" }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Bar dataKey={"takju"} stackId="a" fill="#8884d8" barSize={20} />
            <Bar dataKey={"yakju"} stackId="a" fill="#82ca9d" barSize={20} />
            <Bar dataKey={"spirit"} stackId="a" fill="#ffc658" barSize={20} />
            <Bar dataKey={"fruit"} stackId="a" fill="#ff6666" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomLegend = (props) => {
  const { payload } = props;
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6666"];
  return (
    <div className="d-flex">
      {payload.map((entry, index) => (
        <>
          <FaSquareFull className="mx-2-wrap" size={16} color={colors[index]} />
          <span className="mx-2" key={`item-${index}`}>
            {entry.value === "takju"
              ? "탁주"
              : entry.value === "yakju"
              ? "약주/청주"
              : entry.value === "spirit"
              ? "증류주"
              : "과실주"}
          </span>
        </>
      ))}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="tooltipLabelTitle">{`${label}`}</div>
        <div className="custom-tooltip-tbl-wrap">
          <table className="custom-tooltip-tbl">
            <tbody>
              <tr className="tooltipLabel">
                <td>탁주</td>
                <td>{`${payload[0].value.toLocaleString()}원`}</td>
              </tr>
              <tr className="tooltipLabel">
                <td>약주/청주</td>
                <td>{`${payload[1].value.toLocaleString()}원`}</td>
              </tr>
              <tr className="tooltipLabel">
                <td>증류주</td>
                <td>{`${payload[2].value.toLocaleString()}원`}</td>
              </tr>
              <tr className="tooltipLabel">
                <td>과실주</td>
                <td>{`${payload[3].value.toLocaleString()}원`}</td>
              </tr>
              <tr className="tooltipLabel">
                <td>총매출액</td>
                <td>{`${(
                  payload[0].value +
                  payload[1].value +
                  payload[2].value +
                  payload[3].value
                ).toLocaleString()}원`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

const formatYAxis = (tickItem) => tickItem.toLocaleString();

export default ReadIncome;
