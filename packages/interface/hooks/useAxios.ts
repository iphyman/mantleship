import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export function useAxios<T = any>(params: AxiosRequestConfig) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  useEffect(() => {
    const request = async () => {
      try {
        const res = await axios.request(params);
        setResponse(res.data);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    request();
  }, [params]);

  return { error, loading, response };
}
