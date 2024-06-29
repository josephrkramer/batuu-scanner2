import { useState, useEffect } from "react";

function getStorageValueSet(key: string, defaultValue: any) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return new Set(JSON.parse(saved));
  } else {
    return defaultValue;
  }
}

export const useLocalStorageSet = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValueSet(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(Array.from(value)));
  }, [key, value]);

  return [value, setValue];
};