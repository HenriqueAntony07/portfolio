"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 1800); // tempo total do loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.loader} ${hide ? styles.hide : ""}`}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>Henrique Antony</h1>
      </div>
    </div>
  );
}
