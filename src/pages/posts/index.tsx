import { GetStaticProps } from "next";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Prismic from "@prismicio/client";
import Head from "next/head";
import Client from "../../utils/prismicHelpers";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: {};
  data: [];
  excerpt: string;
  updatedAt: string;
};
interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  // posts.map((post) => console.log(post.data));
  console.log(posts);

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug} href="#">
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
          {/* <a href="#">
            <time>12 de março de 2021</time>
            <strong>Working with NextJS</strong>
            <p>In this guide, you will learn something new about NextJS</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Working with NextJS</strong>
            <p>In this guide, you will learn something new about NextJS</p>
          </a> */}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await Client().query(
    Prismic.Predicates.at("document.type", "post"),
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      data: post.data,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
