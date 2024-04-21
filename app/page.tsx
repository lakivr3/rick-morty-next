"use client";
import Characters from "./components/Characters";
import Search from "./components/Search";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  interface LocationOrigin {
    name: string;
    url: string;
  }

  interface Character {
    created: string;
    episode: string[];
    gender: string;
    id: number;
    image: string;
    location: LocationOrigin;
    name: string;
    origin: LocationOrigin;
    species: string;
    status: string;
    type: string;
    url: string;
  }

  // Fetch data from the API
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}&name=${search}`
      );
      return res.data.results;
    },
    initialPageParam: 1,

    retry: 3,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    maxPages: 20,
  });
  function onClick() {
    setSearch("");
    if (search === "") fetchNextPage();
  }
  console.log(data);
  const results = data?.pages.map((result: Character[]) => {
    return <Characters key={result.map((res) => res.id)} results={result} />;
  });
  useEffect(() => {
    refetch();
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        onClick();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage]);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;
  return (
    <div className="m-10 flex flex-col align-middle w-[700px]">
      <Search setSearch={setSearch} />
      {results}
      <button onClick={onClick} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load Newer"
          : "Nothing more to load"}
      </button>{" "}
    </div>
  );
}
