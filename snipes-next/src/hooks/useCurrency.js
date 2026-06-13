"use client";
import { useState, useEffect } from 'react';

// Simplified mock exchange rates from base INR
const EXCHANGE_RATES = {
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  INR: 1,
};

export function useCurrency() {
  const [currency, setCurrency] = useState('INR');
  const [locale, setLocale] = useState('en-IN');

  useEffect(() => {
    // Lock to INR currency for entire website per user request
    setCurrency('INR');
    setLocale('en-IN');
  }, []);

  const formatPrice = (priceInINR) => {
    // Return explicit 'Rs.' formatting instead of dynamic locale symbols
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(priceInINR)}`;
  };

  return { formatPrice, currency };
}
