"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
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

const Details = () => {
  const { id } = useParams();
  const [fetchedData, updateFetchedData] = useState<Character | any>([]);

  const { name, location, origin, gender, image, status, species, episode } =
    fetchedData;

  const api = `https://rickandmortyapi.com/api/character/${id}`;
  useEffect(() => {
    (async function () {
      const data = await axios.get(api).then((res) => res.data);
      console.log(data);
      updateFetchedData(data);
    })();
  }, [api]);
  return (
    <div className="mb-20">
      <div className="bg-indigo-900 py-6 pl-4 pt-4 h-[140px]">
        <div>
          <Link className="text-white text-sm" href="/">{`< BACK`}</Link>
          <div>
            <img
              src={image}
              alt=""
              className="h-[120px] rounded-full  border-white border-4 absolute left-16 top-20"
            />
          </div>
          <h1 className="absolute top-20 left-56 text-3xl text-white font-bold ">
            {name}
          </h1>
        </div>
      </div>
      <div className="flex mt-24 ml-16 flex-col gap-2">
        <h1 className="text-lg mb-3">Character info</h1>
        <div className="flex   w-[700px] flex-1">
          <div className="flex-[0.2]">
            <h2 className="text-gray-400 text-sm">Species</h2>
            <h2>{species}</h2>
          </div>
          <div className="flex-[0.3]">
            <h2 className="text-gray-400 text-sm">Origin</h2>
            <h2>{origin?.name}</h2>
          </div>
          <div className="flex-[0.6]">
            <h2 className="text-gray-400 text-sm">Location</h2>
            <h2>{location?.name}</h2>
          </div>
        </div>
        <div className="flex   w-[700px] flex-1 mb-5">
          <div className="flex-[0.2]">
            <h2 className="text-gray-400 text-sm">Status</h2>
            <h2>{status}</h2>
          </div>
          <div className="flex-[0.3]">
            <h2 className="text-gray-400 text-sm">Gender</h2>
            <h2>{gender}</h2>
          </div>
          <div className="flex-[0.6]" />
        </div>
        <h2 className="text-lg">Episodes</h2>
        {episode?.map((ep: string, index: number) => {
          if (index >= 13) return null;
          else return <h2 className="text-gray-400 text-sm">{ep}</h2>;
        })}
      </div>
    </div>
  );
};

export default Details;
