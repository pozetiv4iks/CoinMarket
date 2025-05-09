"use client"
import { useEffect, useState } from "react";
import { APIurl } from "../utilits/const";
import Link from "next/link";


const CryptoInfo = ({params}) => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIurl}/assets/${params.coinId}`);
        const data = await response.json();
        setCryptoData(data.data);
      } catch (error) {
        console.error('Error fetching crypto data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {cryptoData && (
        <div key={cryptoData.id}>
          <img src={`https://assets.coincap.io/assets/icons/${cryptoData.symbol.toLowerCase()}@2x.png`} alt={cryptoData.symbol} />
          <h1>{cryptoData.name}</h1>
          <p>Symbol: {cryptoData.symbol}</p>
          <p>Rank: {cryptoData.rank}</p>
          <p>Supply: {cryptoData.supply}</p>
          <p>Price USD: {(+cryptoData.priceUsd).toFixed(2)}</p>
          <p>Market Cap USD: {(+cryptoData.marketCapUsd).toFixed(2)}</p>
          <p>Max Supply:{(+cryptoData.maxSupply).toFixed(2)}</p>
          <button>Add</button>
          <Link href={"/"}><button>Home</button></Link>
        </div>
      )}
    </>
  );
};

export default CryptoInfo;