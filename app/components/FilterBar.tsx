import React from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface FilterBarProps {
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  selectedLetter: string | null;
  handleLetterClick: (letter: string) => void;
}

export default function FilterBar({ search, handleSearchChange, onClearSearch, selectedLetter, handleLetterClick }: FilterBarProps) {
  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto group">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-violet-600 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 flex items-center p-2 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-500/30 dark:group-hover:border-blue-500/30">
          <div className="pl-4 text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a word..."
            className="w-full px-4 py-3 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none text-lg"
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button
              onClick={onClearSearch}
              className="pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap justify-center gap-1.5 px-2">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer ${
              selectedLetter === letter
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110"
                : "bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
