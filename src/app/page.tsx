"use client";
import axios from "axios";
import CharacterCard from "@/components/characterCard/CharacterCard";
import styles from "@/style/characterList.module.css";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import Search from "@/components/search/Search";
import { Character } from "@/types";

export default function Home({
  searchParams,
}: {
  searchParams?: { nameStartsWith?: string; page?: string; limit?: string };
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const nameStartsWith = searchParams?.nameStartsWith;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  const getData = async () => {
    console.log(limit);
    setLoading(true);
    const res = await axios.get("http://localhost:3000/api/character", {
      params: { offset, limit, nameStartsWith },
    });
    setCharacters(res.data.data.results);
    setTotalPages(Math.ceil(res.data.data.total / limit));
    setLoading(false);
  };

  useEffect(() => {
    if (nameStartsWith) {
      setTimeout(() => getData(), 2000);
    } else {
      getData();
    }
  }, [nameStartsWith, offset]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {loading && <div>Loading........</div>}
      {!loading && characters.length > 0 && (
        <div className={styles.container}>
          <Search />
          {characters.map((character) => (
            <div key={character.id} className={styles.character}>
              <CharacterCard {...character} />
            </div>
          ))}
        </div>
      )}
      {characters.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
