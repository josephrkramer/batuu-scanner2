import { useState, useEffect } from "react";

function getStorageValueSet<T>(key: string, defaultValue: Set<T>): Set<T> {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved && saved !== "undefined") {
    return new Set(JSON.parse(saved));
  } else {
    return defaultValue;
  }
}

export const useLocalStorageSet = <T>(
  key: string,
  defaultValue: Set<T>,
): [Set<T>, React.Dispatch<React.SetStateAction<Set<T>>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValueSet(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(Array.from(value)));
  }, [key, value]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setValue(new Set(JSON.parse(event.newValue)));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, setValue];
};
