"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Detail, CharacterDetailProps } from "@/types";
import Loading from "@/components/loading/Loading";

export default function CharacterDetail({ params }: CharacterDetailProps) {
  const [character, setCharacter] = useState<Detail>();
  const [loading, setLoading] = useState<boolean>(false);

  const { slug } = params;

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/character/${slug}`
      );
      setCharacter(res.data.data.results[0]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      {loading && <Loading />}
      {!loading && character && (
        <div className="flex flex-col justify-center items-center gap-5 font-bold text-xl p-1">
          <div className="">
            <Image
              src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
              alt=""
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      )}
    </div>
  );
}
