import { useMemo } from "react";
import { Vocabulary } from "../types";

interface UseVocabularyProps {
  vocabularyList: Vocabulary[];
  favorites: number[];
  view: 'vocabulary' | 'favorites';
  itemsPerPage: number;
  search: string;
  selectedLetter: string | null;
  currentPage: number;
}

export function useVocabulary({ 
  vocabularyList, 
  favorites, 
  view, 
  itemsPerPage,
  search,
  selectedLetter,
  currentPage
}: UseVocabularyProps) {
  const filteredVocab = useMemo(() => {
    let filtered = vocabularyList;

    if (view === 'favorites') {
      filtered = filtered.filter(item => favorites.includes(item.id));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.word.toLowerCase().includes(searchLower) ||
          item.translation.toLowerCase().includes(searchLower)
      );
    } else if (selectedLetter) {
      filtered = filtered.filter((item) =>
        item.word.toUpperCase().startsWith(selectedLetter)
      );
    }

    return filtered;
  }, [vocabularyList, search, selectedLetter, view, favorites]);

  const totalPages = Math.ceil(filteredVocab.length / itemsPerPage);
  const currentVocab = filteredVocab.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    filteredVocab,
    currentVocab,
    totalPages
  };
}
