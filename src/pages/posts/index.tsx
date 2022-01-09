import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import Head from "next/head";
import Client from "../../utils/prismicHelpers";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Working with NextJS</strong>
            <p>In this guide, you will learn something new about NextJS</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Working with NextJS</strong>
            <p>In this guide, you will learn something new about NextJS</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Working with NextJS</strong>
            <p>In this guide, you will learn something new about NextJS</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const document = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(document, null, 2));

  return {
    props: {},
  };
};
