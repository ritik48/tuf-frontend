import { useEffect, useState } from "react";
const BACKEND = import.meta.env.VITE_BACKEND;

export function useEntry() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEntry() {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(BACKEND);
        const data = await res.json();

        setEntries(data.data);
      } catch (error) {
        setError("Cannot fetch the data. Try again");
      } finally {
        setLoading(false);
      }
    }
    fetchEntry();
  }, []);

  return { entries, loading, error };
}
