/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] =
    useState<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .catch((fetchError) => {
        if (fetchError.name === "AbortError") {
          setError("Request cancelled");
        } else {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unknown error"
          );
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request cancelled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
