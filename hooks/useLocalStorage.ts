import { useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  value: T,
  onLoad: (data: T) => void
) {
  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      onLoad(JSON.parse(storedData));
    }
  }, [key, onLoad]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}
