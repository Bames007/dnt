"use client";

import { useState } from "react";
import HomePage from "./home/page";
import PageLoader from "./home/PageLoader";
import Header from "./home/Header";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <PageLoader
          duration={5000}
          showOnce
          onComplete={() => setLoaded(true)}
        />
      )}
      <Header />
      <HomePage />
    </>
  );
}
