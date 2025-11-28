import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        const parsed = JSON.parse(storedValue);
        // Use setTimeout to avoid synchronous state update warning during hydration
        setTimeout(() => setValue(parsed), 0);
      } catch (e) {
        console.error("Error parsing local storage key", key, e);
      }
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}
