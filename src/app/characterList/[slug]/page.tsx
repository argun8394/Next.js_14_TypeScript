import React from 'react'
import axios from "axios";
import Image from 'next/image';


async function getData(slug:any) {
    const url = `https://gateway.marvel.com/v1/public/characters/${slug}?ts=1&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;
    const res = await axios.get(url);
  
    if (!res.status) {
      throw new Error("Failed to fetch data");
    }
  
    // console.log(res);
    return res.data.data.results[0];
  }

  interface CharacterDetailProps{
    params:any
  }

const CharacterDetail =async ({params}:CharacterDetailProps ) => {

    const {slug} = params;

  const character = await getData(slug);
  console.log('sss',character.thumbnail)

  return (
    <div>
        <h1>CharacterDetail</h1>
        <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width="300"
        height="300"
        alt=""
      />
       <h2>{character.name}</h2>

    </div>
  )
}

export default CharacterDetail