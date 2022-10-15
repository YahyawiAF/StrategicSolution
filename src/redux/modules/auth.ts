import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash/merge";

import { AuthLoginResponse } from "~/types";

// Slice
const slice = createSlice({
  name: "auth",
  initialState: {} as AuthLoginResponse,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<Partial<AuthLoginResponse>>
    ) => {
      return merge(state, action.payload);
    },
    logout: () => {
      sessionStorage.clear();
    },
    storeAuthData: (
      state,
      action: PayloadAction<Partial<AuthLoginResponse>>
    ) => {
      return merge(state, action.payload);
    },
  },
});

export default slice;
