"use client";

import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import TransactionsTable from "../components/TransactionsTable";
import Chart from "../components/Chart";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState<{ totalVolume: number; transactionCount: number } | null>(
    null
  );

  const fetchWalletData = async () => {
    try {
      const { data: txData } = await axios.get(`http://localhost:4000/api/wallet/${walletAddress}`);
      const { data: statsData } = await axios.get(`http://localhost:4000/api/wallet/${walletAddress}/stats`);
      setTransactions(txData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">DeFi Analytics Dashboard</h1>
      <SearchBar onSearch={(address) => setWalletAddress(address)} />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={fetchWalletData}
      >
        Fetch Data
      </button>
      {stats && <StatsCard totalVolume={stats.totalVolume} transactionCount={stats.transactionCount} />}
      <TransactionsTable transactions={transactions} />
      <Chart transactions={transactions} />
    </main>
  );
}
