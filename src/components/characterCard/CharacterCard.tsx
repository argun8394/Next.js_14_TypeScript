import Image from "next/image";
import Link from "next/link";
import React from "react";

const CharacterCard = (character: any) => {
  return (
    <div>
      <Link href={`/characterList/${character.id}`}>
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width="300"
        height="300"
        alt=""
      />
      <h2>{character.name}</h2>
      </Link>
    </div>
  );
};

export default CharacterCard;
