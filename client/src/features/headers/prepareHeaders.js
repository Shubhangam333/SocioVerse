export const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState();

  if (auth.accessToken) {
    headers.set("Authorization", `Bearer ${auth.accessToken}`);
  }

  headers.set("Content-Type", "application/json");
  return headers;
};
