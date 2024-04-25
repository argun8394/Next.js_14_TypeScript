"use client";
import { PaginationType } from "@/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const Pagination = ({
  totalPages,
  currentPage,
  setDynamicLimit,
}: PaginationType) => {
  const [selectedLimit, setSelectedLimit] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);

  const createPageURL = (pageNumber: number) => {
    params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleLimitChange = (e: any) => {
    const newLimit = e.target.value;
    setDynamicLimit(newLimit);
  };

  return (
    <div className="flex justify-center items-center h-[40px] gap-4">
      <Link
        href={createPageURL(currentPage - 1)}
        className={
          currentPage - 1 === 0 ? "pointer-events-none opacity-50" : ""
        }
      >
        Prev
      </Link>
      {[currentPage - 2, currentPage - 1, currentPage]
        .filter((page) => page > 0)
        .map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <span
              className={
                currentPage === page
                  ? "flex justify-center items-center bg-white text-black font-bold border-2 rounded-[50%] px-2  "
                  : ""
              }
            >
              {page}
            </span>
          </Link>
        ))}
      {[currentPage + 1, currentPage + 2]
        .filter((page) => page <= totalPages)
        .map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <span>{page}</span>
          </Link>
        ))}
      <Link
        href={createPageURL(currentPage + 1)}
        className={
          currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
        }
      >
        Next
      </Link>
      <select
        value={selectedLimit}
        onChange={handleLimitChange}
        className="text-black border border-gray-300 rounded-md px-1 py-1"
      >
        <option value="limit" disabled>
          Select Limit
        </option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  );
};

export default Pagination;
