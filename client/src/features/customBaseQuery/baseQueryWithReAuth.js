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
    // try to get a new token
    const refreshResult = await baseQuery("/access_token", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
