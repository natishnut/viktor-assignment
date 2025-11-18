const getApiBaseUrl = (): string => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "VITE_API_BASE_URL is not defined in environment variables. "
    );
  }

  return apiBaseUrl;
};

export const API_BASE_URL = getApiBaseUrl();
