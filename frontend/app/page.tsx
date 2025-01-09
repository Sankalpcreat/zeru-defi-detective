"use client";

import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import TransactionsTable from "../components/TransactionsTable";
import Chart from "../components/Chart";

// Add test addresses
const TEST_ADDRESSES = {
  YOUR_WALLET: "0x68290cC5f01578Fcd9113d250C4AC94357FBe50C",

};

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<{ totalVolume: number; transactionCount: number } | null>(null);

  const fetchWalletData = async () => {
    setIsLoading(true);
    setError("");
    try {
      console.log('Fetching data for wallet:', walletAddress);
      
      if (!walletAddress) {
        setError('Please enter a wallet address');
        return;
      }

      // Show loading state
      setTransactions([]);
      setStats(null);

      const { data: txData } = await axios.get(
        `http://localhost:4000/api/wallet/${walletAddress}`
      );
      console.log('Transaction data:', txData);

      if (!txData || txData.length === 0) {
        setError('No transactions found for this address');
        return;
      }

      const { data: statsData } = await axios.get(
        `http://localhost:4000/api/wallet/${walletAddress}/stats`
      );
      
      setTransactions(txData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      setError('Failed to fetch wallet data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const useTestAddress = () => {
    setWalletAddress(TEST_ADDRESSES.ACTIVE);
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">DeFi Analytics Dashboard</h1>
      
      <SearchBar onSearch={setWalletAddress} />
      
      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={fetchWalletData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </button>
        
        <button
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
          onClick={useTestAddress}
          disabled={isLoading}
        >
          Use Test Address
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {stats && <StatsCard totalVolume={stats.totalVolume} transactionCount={stats.transactionCount} />}
      <TransactionsTable transactions={transactions} />
      <Chart transactions={transactions} />
    </main>
  );
}
