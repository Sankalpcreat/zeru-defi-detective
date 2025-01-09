"use client";
import { useState } from "react";
interface SearchBarProps {
  onSearch: (walletAddress: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-2xl mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter wallet address (0x...)"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button 
        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 font-semibold"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
