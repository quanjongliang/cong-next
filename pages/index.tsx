import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <p>Hello</p>
    </BaseLayout>
  );
};

export default Home;
