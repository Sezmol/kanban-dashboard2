import { Layout, Breadcrumb, Row, Col, Tabs } from "antd";

import NavBar from "./components/NavBar/NavBar";

import styles from "./App.module.scss";
import Header from "./components/Header/Header";

const { Content } = Layout;
const { TabPane } = Tabs;

const App = () => (
  <Layout className={styles.app}>
    <NavBar />
    <Layout.Sider></Layout.Sider>
    <Layout>
      <Header />
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <Row gutter={16}>
            <Col span={8}>{/* Place your components/cards here */}</Col>
            <Col span={16}>
              <Tabs defaultActiveKey='1' onChange={() => {}}>
                <TabPane tab='Tab 1' key='1'>
                  {/* Content of Tab Pane 1 */}
                </TabPane>
                <TabPane tab='Tab 2' key='2'>
                  {/* Content of Tab Pane 2 */}
                </TabPane>
                <TabPane tab='Tab 3' key='3'>
                  {/* Content of Tab Pane 3 */}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default App;
