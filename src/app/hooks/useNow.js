import { useEffect, useState } from "react";

export default function useNow(intervalMs = 60000) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const syncNow = () => setNow(Date.now());
    syncNow();
    const interval = setInterval(syncNow, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
}
