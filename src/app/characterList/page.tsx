"use client";
import axios from "axios";
import CharacterCard from "../../components/characterCard/CharacterCard";
import styles from "./characterList.module.css";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import Search from "@/components/search/Search";

type Character = {
  id?: number;
  name?: string;
};

export default function CharacterList({
  searchParams,
}: {
  searchParams?: { nameStartsWith?: string; page?: string; limit?: string };
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // const [offset, setOffset] = useState(0);

  const nameStartsWith = searchParams?.nameStartsWith || "A";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 18;
  const offset = (currentPage - 1) * limit;
  // const totalPages = 2;

  // let total = null;

  const getData = async () => {
    try {
      setLoading(true);
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${nameStartsWith}&offset=${offset}&limit=${limit}&apikey=3579453ac950b98ceed0d384978790d4&hash=d578505f73327bda014280c1f938d0d5`;

      const res = await axios.get(url);
      // console.log(res.data);

      if (res) {
        const { results, total } = res.data.data;
        setCharacters(results || []);
        setTotalPages(Math.ceil(total / limit));
        console.log(res.data.data.total);
        console.log(results);
      }
    } catch (err) {
      console.log("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => getData(), 1000);
  }, [nameStartsWith, offset]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {loading && <div>Loading........</div>}
      {!loading && (
        <div className={styles.container}>
          <Search />
          {characters.map((character) => (
            <div key={character.id} className={styles.character}>
              <CharacterCard {...character} />
            </div>
          ))}
          {characters.length > limit && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
        </div>
      )}
    </div>
  );
}
