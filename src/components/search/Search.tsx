"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("nameStartsWith", term);
    } else {
      params.delete("nameStartsWith");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex justify-center w-[90%]">
      <input
        type="text"
        placeholder="Search...."
        onChange={(e) => handleSearch(e.target.value)}
        className="text-black px-2 w-1/2 h-8 rounded-lg"
        defaultValue={searchParams.get("nameStartsWith")?.toString()}
      />
    </div>
  );
};

export default Search;
