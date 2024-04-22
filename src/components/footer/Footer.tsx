import React from "react";
import styles from "./footer.module.css";


const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Marvel</div>
      <div className={styles.text}>
      Marvel creative thoughts agency © All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
