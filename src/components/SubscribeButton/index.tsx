import React from "react";
import { api } from "../../services/api";
import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";
import { getStripeJs } from "../../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

//getServerSideProps (SSR)
//getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) return signIn("github");

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
