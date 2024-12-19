import React from 'react';
import Image from "../../Pics/coin.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          src={Image}
          alt="Home Image"
          className="w-50 h-50 object-cover mb-4"
        />
        <h1 className="text-7xl font-bold text-gray-800">COINCOIN</h1>
        <p className="text-lg text-gray-600 mt-2">Le coin-coin des bonnes affaires</p>
      </div>
    </div>
  );
}
