import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, getUserProfile, updateUserProfile } from "./user.api";

// Thunk action to get user token
export const getToken = createAsyncThunk(
  "user/getToken",
  async (data, thunkAPI) => {
    try {
      const response = await loginUser(data.email, data.password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk action to get user profile
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfile();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk action to update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await updateUserProfile(data.firstName, data.lastName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state of the user slice
const initialState = {
  firstname: null,
  lastname: null,
  token: null,
  isConnect: false,
  message: null,
};

// Reducer function for the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to logout user
    logout: (state) => {
      state.firstname = "";
      state.lastname = "";
      state.token = null;
      state.isConnect = false;
      state.message = null;
      sessionStorage.removeItem("token");
    },
    // Action to set session token for user
    getSession: (state, action) => {
      state.token = action.payload;
      state.isConnect = true;
    },
  },
  // Extra reducers for the thunk actions
  extraReducers: (builder) => {
    // Handler for getToken.pending
    builder
      .addCase(getToken.pending, () => {
        console.log("Loading connection of User");
      })
      // Handler for getToken.fulfilled
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload;
        sessionStorage.setItem("token", state.token);
        state.isConnect = true;
        state.message = null;
      })
      // Handler for getToken.rejected
      .addCase(getToken.rejected, (state, action) => {
        state.message = action.payload;
      })
      // Handler for getProfile.pending
      .addCase(getProfile.pending, () => {
        console.log("Loading page of Profil");
      })
      // Handler for getProfile.fulfilled
      .addCase(getProfile.fulfilled, (state, action) => {
        state.firstname = action.payload.firstName;
        state.lastname = action.payload.lastName;
      })
      // Handler for getProfile.rejected
      .addCase(getProfile.rejected, (state, action) => {
        state.message = action.payload;
      })
      // Handler for updateProfile.pending
      .addCase(updateProfile.pending, () => {
        console.log("Updating Profil");
      })
      // Handler for updateProfile.fulfilled
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.firstname = action.payload.data.body.firstName;
        state.lastname = action.payload.data.body.lastName;
      })
      // Handler for updateProfile.rejected
      .addCase(updateProfile.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});



export const { logout, getSession } = userSlice.actions;

export default userSlice.reducer;
