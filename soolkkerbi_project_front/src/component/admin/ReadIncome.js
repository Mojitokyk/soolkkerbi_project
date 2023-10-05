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

const ReadIncome = () => {
  const [incomeList, setIncomeList] = useState([]);

  const data = [
    {
      name: "23-10-01",
      탁주: 150000,
      약청주: 240000,
      과실주: 120000,
      증류주: 40000,
    },
    {
      name: "23-10-02",
      탁주: 300000,
      약청주: 139800,
      과실주: 120000,
      증류주: 65000,
    },
    {
      name: "23-10-03",
      탁주: 200000,
      약청주: 980000,
      과실주: 210000,
      증류주: 600000,
    },
    {
      name: "23-10-04",
      탁주: 278000,
      약청주: 390800,
      과실주: 150000,
      증류주: 960000,
    },
    {
      name: "23-10-05",
      탁주: 189000,
      약청주: 480000,
      과실주: 890000,
      증류주: 500000,
    },
  ];

  useEffect(() => {
    axios
      .post("/pay/readAllIncome", null)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">매출현황조회</div>
      <div>날짜조회버튼</div>
      <div>
        <ResponsiveContainer width={"100%"} height={600}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="탁주" stackId="a" fill="#241468" barSize={50} />
            <Bar dataKey="약청주" stackId="a" fill="#9F0D7F" barSize={50} />
            <Bar dataKey="과실주" stackId="a" fill="#EA1179" barSize={50} />
            <Bar dataKey="증류주" stackId="a" fill="#F79BD3" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadIncome;
