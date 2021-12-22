import { GetServerSideProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início - Ignite</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👍 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            {" "}
            Get access to all the publications <br />
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="avatar" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1K9dqxGbI6nJA7GtqRAyao44", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
  };
};
