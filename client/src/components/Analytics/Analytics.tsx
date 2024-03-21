import { Card, Flex, Progress, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { Bar, BarChart, Line, LineChart, Tooltip } from "recharts";
import useSocketData from "../../hooks/useSocketData";

import styles from "./Analytics.module.scss";

const Analytics = () => {
  const data = useSocketData("charts-data");

  return (
    <Flex className={styles.analytics} vertical gap={12}>
      <Title level={5}>Analytics</Title>
      <Card className={styles.card}>
        <Title className={styles.cardTitle} level={5}>
          TOTAL TIME
        </Title>
        <Paragraph style={{ fontSize: 24, fontWeight: 600 }}>2d 3h</Paragraph>
        <Flex>
          <LineChart width={88} height={38} data={data?.lineChartData}>
            <Tooltip
              contentStyle={{ fontSize: 8 }}
              wrapperStyle={{ width: 40, height: 10 }}
            />
            <Line type='linear' dataKey='x' stroke='#60BF9D' />
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
        <BarChart width={137} height={103} data={data?.barChartData}>
          <Tooltip />
          <Bar legendType='square' dataKey='x' fill='#8884d8' />
        </BarChart>
      </Card>
      <Card className={styles.card}>
        <Title className={styles.cardTitle} level={5}>
          TIME
        </Title>

        <Progress
          strokeColor={["#B2BFFA", "#B2BFFA"]}
          trailColor='#B6EDFF'
          style={{ marginTop: 10 }}
          percent={68}
          type='circle'
        />
      </Card>
    </Flex>
  );
};

export default Analytics;
