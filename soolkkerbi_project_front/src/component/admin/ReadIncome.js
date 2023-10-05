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
  const data = [
    {
      name: "23-10-01",
      탁주: 4000,
      약청주: 2400,
      과실주: 1200,
      증류주: 600,
      amt: 2400,
    },
    {
      name: "23-10-02",
      탁주: 3000,
      약청주: 1398,
      과실주: 1200,
      증류주: 600,
      amt: 2210,
    },
    {
      name: "23-10-03",
      탁주: 2000,
      약청주: 9800,
      과실주: 1200,
      증류주: 600,
      amt: 2290,
    },
    {
      name: "23-10-04",
      탁주: 2780,
      약청주: 3908,
      과실주: 1200,
      증류주: 600,
      amt: 2000,
    },
    {
      name: "23-10-05",
      탁주: 1890,
      약청주: 4800,
      과실주: 1200,
      증류주: 600,
      amt: 2181,
    },
  ];

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">매출현황조회</div>
      <div></div>
      <div>
        <ResponsiveContainer width={"100%"} height={500}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="탁주" fill="#FF6289" />
            <Bar dataKey="약청주" fill="#FF4289" />
            <Bar dataKey="과실주" fill="#FF2289" />
            <Bar dataKey="증류주" fill="#ED0289" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadIncome;
