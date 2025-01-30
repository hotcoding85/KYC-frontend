import { useState, useCallback } from "react";
import ApiClient from "../lib/ApiClient"; // Adjust the path as necessary

const useApi = (initialHeaders = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiClient = new ApiClient(initialHeaders);

  const fetchData = useCallback(
    async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiClient.request(endpoint, method, body, {...headers,credentials: 'include'});
        setLoading(false);
        return { result, error: null };
      } catch (err) {
        setError(err);
        setLoading(false);
        return { result: null, error: err };
      }
    },
    [apiClient]
  );

  return { fetchData, loading, error };
};

export default useApi;
