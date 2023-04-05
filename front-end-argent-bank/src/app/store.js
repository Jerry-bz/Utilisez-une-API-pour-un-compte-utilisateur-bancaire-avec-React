import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user.slice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [thunk],
});
