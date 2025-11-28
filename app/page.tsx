"use client";

import { useState, useRef } from "react";
import { vocabularyList } from "./data/vocabulary";
import VocabularyCard from "./components/VocabularyCard";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Controls from "./components/Controls";
import FilterBar from "./components/FilterBar";
import AuthButton from "./components/AuthButton";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useFavorites } from "./hooks/useFavorites";
import { useVocabulary } from "./hooks/useVocabulary";
import { useScrollPreservation } from "./hooks/useScrollPreservation";

export default function Home() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  
  // Local Storage State
  const [showExamples, setShowExamples] = useLocalStorage("showExamples", true);
  const [showSpeaker, setShowSpeaker] = useLocalStorage("showSpeaker", true);
  const [showTranslation, setShowTranslation] = useLocalStorage("showTranslation", true);
  const [autoScroll, setAutoScroll] = useLocalStorage("autoScroll", true);

  // App State
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [view, setView] = useState<'vocabulary' | 'favorites'>('vocabulary');
  
  // Custom Hooks
  const { favorites, isSaving, notification, toggleFavorite } = useFavorites(user);
  
  const { filteredVocab, currentVocab, totalPages } = useVocabulary({
    vocabularyList,
    favorites,
    view,
    itemsPerPage,
    search,
    selectedLetter,
    currentPage
  });

  const resultsRef = useRef<HTMLDivElement>(null);
  const { prepareScroll, scrollToResults } = useScrollPreservation(currentPage, autoScroll, resultsRef);

  // Handlers
  const handlePageChange = (page: number) => {
    prepareScroll();
    setCurrentPage(page);
    scrollToResults();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      setItemsPerPage(vocabularyList.length);
    } else {
      setItemsPerPage(Number(value));
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedLetter(null);
  };

  // Toggle Handlers
  const toggleSpeaker = () => setShowSpeaker(!showSpeaker);
  const toggleTranslation = () => setShowTranslation(!showTranslation);
  const toggleExamples = () => setShowExamples(!showExamples);
  const toggleAutoScroll = () => setAutoScroll(!autoScroll);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      {/* Notification Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-3 ${
          notification?.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
        }`}>
          {notification?.type === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
          )}
          <span className="font-medium text-sm">{notification?.message}</span>
        </div>
      </div>

      {/* Saving Indicator */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isSaving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Saving...</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-12 max-w-7xl relative">
        
        <AuthButton 
          user={user} 
          loading={loading} 
          signInWithGoogle={signInWithGoogle} 
          logout={logout} 
        />

        <Header 
          view={view} 
          setView={setView} 
          setCurrentPage={setCurrentPage} 
        />

        <div className="mb-12 space-y-8">
          <Controls 
            showSpeaker={showSpeaker}
            toggleSpeaker={toggleSpeaker}
            showTranslation={showTranslation}
            toggleTranslation={toggleTranslation}
            showExamples={showExamples}
            toggleExamples={toggleExamples}
            autoScroll={autoScroll}
            toggleAutoScroll={toggleAutoScroll}
          />

          <FilterBar 
            search={search}
            handleSearchChange={handleSearchChange}
            onClearSearch={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            selectedLetter={selectedLetter}
            handleLetterClick={handleLetterClick}
          />
        </div>

        {/* Results Info & Items Per Page */}
        <div ref={resultsRef} className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Showing {filteredVocab.length} words
            {selectedLetter && ` starting with "${selectedLetter}"`}
            {search && ` matching "${search}"`}
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage === vocabularyList.length ? "all" : itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-pointer"
            >
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="120">120</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-6">
          {currentVocab.length > 0 ? (
            currentVocab.map((item) => (
              <VocabularyCard 
                key={item.id} 
                item={item} 
                showExamples={showExamples}
                showSpeaker={showSpeaker}
                showTranslation={showTranslation}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
              <p className="text-zinc-500 dark:text-zinc-500 text-xl">
                No words found matching your criteria.
              </p>
              <button 
                onClick={handleClearFilters}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <Footer />
      </main>
    </div>
  );
}

