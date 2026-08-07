import { useEffect, useState } from "react";

export default function useFetch(apiFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiFunction();
        setData(response);
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
  };
}