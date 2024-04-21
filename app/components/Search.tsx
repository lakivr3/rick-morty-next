"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({ setSearch }: any) => {
  return (
    <form className="mb-10 relative">
      <input
        onChange={(e) => {
          // updatePageNumber(1);
          setSearch(e.target.value);
        }}
        placeholder={`Search character...`}
        className=" bg-gray-100 w-[700px] p-4 pl-10"
        type="text"
      />
      <CiSearch
        className="text-gray-400 text-xl"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
    </form>
  );
};

export default Search;
