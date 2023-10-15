export const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState();

  if (auth.accessToken) {
    headers.set("Authorization", `Bearer ${auth.accessToken}`);
  }
  return headers;
};
