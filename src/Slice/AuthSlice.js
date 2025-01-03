import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/user-routes/user-login`;

export const authenticate = createAsyncThunk(
  "Auth/login",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      // console.log(data);

      return data?.data;
    } catch (error) {
      console.log(error?.response?.data?.data?.message);
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isloading: false,
    userInfo: {},
    error: "",
    toasterBool: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {
    ClearState: (state) => {
      state.error = "";
      state.isError = false;
      state.isSuccess = false;
    },
    ClearToaster: (state) => {
      state.toasterBool = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(authenticate.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isloading = false;
        state.isSuccess = true;
        state.userInfo = payload;
        state.toasterBool = true;
      })
      .addCase(authenticate.rejected, (state, { payload }) => {
        state.isloading = false;
        state.isError = true;
        state.isSuccess = false;
        // console.log(payload, "rejected");
        state.error = payload;
      });
  },
});
export const { ClearState, ClearToaster } = AuthSlice.actions;
export default AuthSlice.reducer;
