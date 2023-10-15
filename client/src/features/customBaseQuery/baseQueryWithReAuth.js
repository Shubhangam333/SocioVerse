import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout, setCredentials } from "../auth/authSlice";
import { prepareHeaders } from "../headers/prepareHeaders";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: prepareHeaders,
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 500) {
    const refreshResult = await baseQuery("/access_token", api, extraOptions);
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
