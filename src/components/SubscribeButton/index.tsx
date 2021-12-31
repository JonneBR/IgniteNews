import { useSession, signIn } from "next-auth/react";
import React from "react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

//getServerSideProps (SSR)
//getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  function handleSubscribe() {
    if (!session) return signIn("github");
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
