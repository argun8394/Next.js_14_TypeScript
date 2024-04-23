"use client";

import { PaginationType } from "@/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages, currentPage }: PaginationType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //   const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
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
                  ? "bg-white text-black font-bold border-2 rounded-[50%] px-1  "
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
    </div>
  );
};

export default Pagination;
