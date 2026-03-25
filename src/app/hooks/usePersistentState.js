import { useEffect, useRef, useState } from "react";

export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const skipInitialSaveRef = useRef(true);

  useEffect(() => {
    function loadValue() {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) setValue(JSON.parse(storedValue));
      } catch {}
    }

    loadValue();
  }, [key]);

  useEffect(() => {
    if (skipInitialSaveRef.current) {
      skipInitialSaveRef.current = false;
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}
