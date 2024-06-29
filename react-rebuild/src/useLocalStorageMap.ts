import { useState, useEffect } from "react";

function getStorageValueMap(key: string, defaultValue: any) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return new Map<string, any>(JSON.parse(saved));
  } else {
    return defaultValue;
  }
}

export const useLocalStorageMap = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValueMap(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
  }, [key, value]);

  return [value, setValue];
};