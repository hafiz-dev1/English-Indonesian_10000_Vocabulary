import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        const parsed = JSON.parse(storedValue);
        // Only update if value is different to avoid unnecessary re-renders
        // Note: This simple check works for primitives. For objects, deep comparison might be needed but is overkill here.
        if (JSON.stringify(parsed) !== JSON.stringify(value)) {
             setValue(parsed);
        }
      } catch (e) {
        console.error("Error parsing local storage key", key, e);
      }
    }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}
