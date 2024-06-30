import { useState, useEffect } from "react";

function getStorageValueMap<T>(
  key: string,
  defaultValue: Map<string, T>,
): Map<string, T> {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return new Map<string, T>(JSON.parse(saved));
  } else {
    return defaultValue;
  }
}

export const useLocalStorageMap = <T>(
  key: string,
  defaultValue: Map<string, T>,
): [Map<string, T>, React.Dispatch<React.SetStateAction<Map<string, T>>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValueMap(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
  }, [key, value]);

  return [value, setValue];
};
