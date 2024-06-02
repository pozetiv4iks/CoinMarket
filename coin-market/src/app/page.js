"use client"

import React, { useState, useEffect } from 'react';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap'); // По умолчанию сортируем по рыночной капитализации
  const [sortOrder, setSortOrder] = useState('desc'); // Начинаем с сортировки по убыванию

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        setCryptoData(data.data);
      } catch (error) {
        console.error('Error fetching crypto data', error);
      }
    };
    fetchData();
  }, []);

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCryptoData = filteredCryptoData.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortBy('name')}>Name</th>
            <th onClick={() => setSortBy('priceUsd')}>Price</th>
            <th onClick={() => setSortBy('marketCapUsd')}>Market Cap</th>
            <th onClick={() => setSortBy('changePercent24Hr')}>Change (24h)</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {sortedCryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>${(+crypto.priceUsd).toFixed(2)}</td>
              <td>${(+crypto.marketCapUsd).toLocaleString()}</td>
              <td>{(+crypto.changePercent24Hr).toFixed(2)}%</td>
              <td>
                <button>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;