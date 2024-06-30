import { useState, useEffect } from "react";

export function useLocalStorageStateRedo(key, initial) {
  const [value, setValue] = useState(function () {
    return JSON.parse(localStorage.getItem(key))
      ? JSON.parse(localStorage.getItem(key))
      : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
