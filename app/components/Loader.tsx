"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";


export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setVisible(false);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.loader}>
        <span className={styles.text}>Henrique Antony</span>
    </div>
  );
}
