export async function Fetch<T>(
  url: string,
  options: RequestInit & { headers?: Record<string, string> } = {}
): Promise<T> {
  const defaultHeaders = {
    accept: "application/json",
    authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}${url}`,
    mergedOptions
  );

  return (await response.json()) as T;
}
