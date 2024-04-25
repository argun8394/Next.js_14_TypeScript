"use client";

import axios from "axios";
import CharacterCard from "@/components/characterCard/CharacterCard";
import styles from "@/style/characterList.module.css";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import Search from "@/components/search/Search";
import { Character } from "@/types";

export default function Home({
  searchParams,
}: {
  searchParams?: { nameStartsWith?: string; page?: string; limit?: number };
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dynamicLimit, setDynamicLimit] = useState(0);

  const nameStartsWith = searchParams?.nameStartsWith;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = dynamicLimit || 10;
  const offset = (currentPage - 1) * limit;

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/character", {
        params: { offset, limit, nameStartsWith },
      });
      setCharacters(res.data.data.results);
      setTotalPages(Math.ceil(res.data.data.total / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nameStartsWith) {
      setTimeout(() => getData(), 2000);
    } else {
      getData();
    }
  }, [nameStartsWith, offset, dynamicLimit]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {loading && <div className="text-gray-500">Loading...</div>}
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
      {!loading && totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setDynamicLimit={setDynamicLimit}
        />
      )}
    </div>
  );
}
