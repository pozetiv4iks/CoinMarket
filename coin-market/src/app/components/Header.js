'use client'
import React, { useState, useEffect } from 'react';

const Header = ({ initialPortfolioValue }) => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTopCryptos = async () => {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets?limit=3');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCryptoPrices(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTopCryptos();
  }, []);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="header">
      <div className='logo'><img src="https://assets.coincap.io/assets/icons/btc@2x.png" alt='bitcoin' />CoinMarket</div>
      <div className="portfolio-info" onClick={handleModalOpen}>
        <p>Portfolio Value: {portfolioValue ? portfolioValue.toFixed(2) : '0.00'} USD 
          {portfolioValue && initialPortfolioValue ? (`${((portfolioValue - initialPortfolioValue) / initialPortfolioValue * 100).toFixed(2)}%`) : ''}
        </p>
      </div>
      <div className="crypto-prices">
        {cryptoPrices && cryptoPrices.map(crypto => (
          <div className="leader-coin" key={crypto.id}>
            <p>{crypto.name}: {(+crypto.priceUsd).toFixed(2)} USD</p>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal">
          <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Change (24h)</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
          <button onClick={handleModalClose}>Close Modal</button>
        </div>
      )}
      <div className='line'></div>
    </div>
  );
};

export default Header;