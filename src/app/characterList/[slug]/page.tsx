import React from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./characterDetail.module.css";

async function getData(slug: any) {
  const url = `https://gateway.marvel.com/v1/public/characters/${slug}?ts=1&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;
  const res = await axios.get(url);

  if (!res.status) {
    throw new Error("Failed to fetch data");
  }

  // console.log(res);
  return res.data.data.results[0];
}

interface CharacterDetailProps {
  params: any;
}

const CharacterDetail = async ({ params }: CharacterDetailProps) => {
  const { slug } = params;

  const character = await getData(slug);

  return (
    <div className={styles.container}>
      <h1>CharacterDetail</h1>
      <div className={styles.imgContainer}>
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
          fill
          className={styles.img}
        />
      </div>
      <h2>{character.name}</h2>
    </div>
  );
};

export default CharacterDetail;
