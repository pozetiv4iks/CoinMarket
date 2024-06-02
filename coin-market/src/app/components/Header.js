'use client'
import React, { useState } from 'react';

const Header = ({ cryptoPrices, portfolioValue, initialPortfolioValue }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userCoins, setUserCoins] = useState(['Bitcoin', 'Ethereum', 'Cardano']); // Пример списка монет пользователя

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleRemoveCoin = (coin) => {
    setUserCoins(userCoins.filter(item => item !== coin));
  };

  return (
    <div className="header">
      <div className="crypto-prices">
        {cryptoPrices && cryptoPrices.map(crypto => (
          <div key={crypto.id}>
            <p>{crypto.name}: ${crypto.price}</p>
          </div>
        ))}
      </div>
      <div className="portfolio-info" onClick={handleModalOpen}>
        <p>Portfolio Value: ${portfolioValue ? portfolioValue.toFixed(2) : 'Loading...'} 
          {portfolioValue && initialPortfolioValue ? (`${((portfolioValue - initialPortfolioValue) / initialPortfolioValue * 100).toFixed(2)}%`) : ''}
        </p>
      </div>
      {modalOpen && (
        <div className="modal">
          <h2>User's Coin List</h2>
          <ul>
            {userCoins.map((coin, index) => (
              <li key={index}>
                {coin} <button onClick={() => handleRemoveCoin(coin)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleModalClose}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default Header;