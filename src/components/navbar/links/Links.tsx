"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import Image from "next/image";


interface LinkItem {
    title: string;
    path: string;
  }

const links: LinkItem[] = [
  { title: "HomePage", path: "/" },
  { title: "Characters", path: "/characterList" },
];

const Links = () => {
  const [open, setOpen] = useState(false);


  return (
    <div className={styles.container}>
      <div className={styles.links}>
     
       {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;