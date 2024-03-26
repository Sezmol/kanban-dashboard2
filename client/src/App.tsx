import { Layout } from "antd";

import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import MainHeader from "./components/MainHeader/MainHeader";
import MainContent from "./components/MainContent/MainContent";

import styles from "./App.module.scss";

const App = () => (
  <Layout className={styles.app}>
    <NavBar />
    <SideBar />
    <Layout style={{ height: "100%" }}>
      <Header />
      <MainHeader />
      <MainContent />
    </Layout>
  </Layout>
);

export default App;
