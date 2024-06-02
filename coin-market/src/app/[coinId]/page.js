'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CoinInfoPage = ({ coinId }) => {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
        const data = await response.json();
        if (data.data) {
          setCoinData(data.data);
        } else {
          console.error('Coin data not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data', error);
        setLoading(false);
      }
    };
    fetchCoinData();
  }, [coinId]);

  // Остальной код остается без изменений
};

export default CoinInfoPage;