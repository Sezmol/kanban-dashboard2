import { Card, Flex, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from "recharts";

import styles from "./Analytics.module.scss";

const lineChartData = [
  {
    name: "Page A",
    pv: 0,
    amt: 100,
  },
  {
    name: "Page B",
    pv: 60,
    amt: 100,
  },
  {
    name: "Page C",
    pv: 20,
    amt: 100,
  },
  {
    name: "Page D",
    pv: 50,
    amt: 100,
  },
  {
    name: "Page D",
    pv: 0,
    amt: 100,
  },
  {
    name: "Page E",
    pv: 100,
    amt: 100,
  },
];

const barChartData = [
  {
    uv: 103,
    amt: 103,
  },
  {
    uv: 76,
    amt: 103,
  },
  {
    uv: 76,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 33,
    amt: 103,
  },
  {
    uv: 33,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 0,
    amt: 103,
  },
  {
    uv: 103,
    amt: 103,
  },
  {
    uv: 87,
    amt: 103,
  },
];

const pieChartData = [
  { name: "Group A", value: 15 },
  { name: "Group B", value: 43 },
  { name: "Group C", value: 43 },
];

const COLORS = ["#B6EDFF", "#FFF2AB", "#B2BFFA"];

const Analytics = () => {
  return (
    <Flex className={styles.analytics} vertical gap={12}>
      <Title level={5}>Analytics</Title>
      <Card className={styles.card}>
        <Title className={styles.cardTitle} level={5}>
          TOTAL TIME
        </Title>
        <Paragraph style={{ fontSize: 24, fontWeight: 500 }}>2d 3h</Paragraph>
        <Flex>
          <LineChart width={88} height={38} data={lineChartData}>
            <Line type='linear' dataKey='pv' stroke='#60BF9D' />
          </LineChart>

          <Typography.Text
            style={{ color: "#959ba3", fontSize: 8, textAlign: "start" }}
          >
            Activity <br />
            increased by 30%
          </Typography.Text>
        </Flex>
      </Card>
      <Card className={styles.card}>
        <Title className={styles.cardTitle} level={5}>
          COMMITS
        </Title>
        <BarChart width={137} height={103} data={barChartData}>
          <Bar legendType='square' dataKey='uv' fill='#8884d8' />
        </BarChart>
      </Card>
      <Card className={styles.card}>
        <Title className={styles.cardTitle} level={5}>
          TIME
        </Title>

        <PieChart width={145} height={145}>
          <Pie
            dataKey='value'
            data={pieChartData}
            innerRadius={60}
            outerRadius={70}
            fill='#82ca9d'
          >
            {pieChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </Card>
    </Flex>
  );
};

export default Analytics;
