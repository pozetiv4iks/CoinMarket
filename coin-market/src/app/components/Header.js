'use client'
import React, { useState } from 'react';

const Header = ({ cryptoPrices, portfolioValue, initialPortfolioValue }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


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
        <p>Portfolio Value: ${portfolioValue ? portfolioValue.toFixed(2) : '0.00'} 
          {portfolioValue && initialPortfolioValue ? (`${((portfolioValue - initialPortfolioValue) / initialPortfolioValue * 100).toFixed(2)}%`) : ''}
        </p>
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tbody>
        </table>
          <button onClick={handleModalClose}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default Header;