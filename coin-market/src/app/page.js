"use client"

import React, { useState, useEffect } from 'react';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap'); 
  const [sortOrder, setSortOrder] = useState('desc'); 

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
            <th>Logo</th>
            <th onClick={() => setSortBy('name')}>Name</th>
            <th onClick={() => setSortBy('priceUsd')}>Price</th>
            <th onClick={() => setSortBy('marketCapUsd')}>Market Cap</th>
            <th onClick={() => setSortBy('changePercent24Hr')}>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {sortedCryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td><img src={`https://assets.coincap.io/assets/icons/${crypto.id}@2x.png`} alt={crypto.symbol} /></td>
              <td>{crypto.name}</td>
              <td>${(+crypto.priceUsd).toFixed(2)}</td>
              <td>${(+crypto.marketCapUsd).toLocaleString()}</td>
              {crypto.changePercent24Hr < 0 ? (
                <td style={{ color: 'red' }}>{(+crypto.changePercent24Hr).toFixed(2)}%</td>
              ) : (
                <td style={{ color: 'green' }}>{(+crypto.changePercent24Hr).toFixed(2)}%</td>
              )}
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