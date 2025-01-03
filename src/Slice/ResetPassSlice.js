import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/user-routes/reset-pass`;

export const resetpass = createAsyncThunk(
  "Auth/Reset",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
    //   console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const ResetPassSlice = createSlice({
  name: "Reset",
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
      .addCase(resetpass.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(resetpass.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isloading = false;
        state.isSuccess = true;
        state.userInfo = payload;
        state.toasterBool = true;
      })
      .addCase(resetpass.rejected, (state, { payload }) => {
        state.isloading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = payload;
      });
  },
});
export const { ClearState, ClearToaster } = ResetPassSlice.actions;
export default ResetPassSlice.reducer;
