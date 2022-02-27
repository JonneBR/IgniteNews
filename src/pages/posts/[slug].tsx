import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Head } from "next/document";
import { RichText } from "prismic-reactjs";
import { getPrismicClient } from "../../services/prismic";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  console.log("POST", post.slug);

  return (
    <>
      QWE{" "}
      {/* <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main>
        <article>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
        </article>
      </main> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  //   const session = await getSession({ req });
  const { slug } = params;
  console.log(slug);

  const prismic = getPrismicClient(req);

  const prismicDoc = await prismic.getByUID("Post", String(slug), {});
  // console.log("response", prismicDoc);

  const post = {
    slug,
    // title: RichText.asText(response.data.title),
    // content: RichText.asHtml(response.data.content),
    // updatedAt: new Date(response.last_publication_date).toLocaleDateString(
    //   "pt-BR",
    //   {
    //     day: "2-digit",
    //     month: "long",
    //     year: "numeric",
    //   }
    // ),
  };

  return {
    props: { post },
  };
};
