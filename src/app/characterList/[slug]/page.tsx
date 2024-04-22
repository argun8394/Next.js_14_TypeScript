import React from "react";
import axios from "axios";
import Image from "next/image";

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
  console.log(character);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <h2>{character.name}</h2>
      <p>{character.description}</p>
    </div>
  );
};

export default CharacterDetail;
