import React, { useEffect } from "react";
import Link from "next/link";
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

const Characters = ({ results }: any) => {
  // console.log(info);
  // console.log(results);

  if (results) {
    return (
      <div className="w-[900px]">
        <div>
          {results.map((ch: Character) => (
            <div key={ch.id} className="flex mb-16">
              <Link href={`/${ch.id}`}>
                <img src={ch.image} alt="" className="h-[100px] rounded-full" />
              </Link>
              <div className="flex flex-col ml-10 justify-center">
                <div className="my-2">
                  <h1 className="font-bold text-2xl">{ch.name}</h1>
                </div>
                <div className="flex justify-between flex-1 w-[700px]">
                  <div className="flex-[0.2]">
                    <h2 className="text-gray-400 text-sm">Species</h2>
                    <h2 className="flex flex-wrap text-wrap">{ch?.species}</h2>
                  </div>
                  <div className="flex-[0.3]">
                    <h2 className="text-gray-400 text-sm">Origin</h2>
                    <h2>{ch?.origin?.name}</h2>
                  </div>
                  <div className="flex-[0.7]">
                    <h2 className="text-gray-400 text-sm">Location</h2>
                    <h2>{ch?.location?.name}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Characters;
