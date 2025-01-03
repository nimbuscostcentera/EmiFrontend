import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/user-routes/update-user`;

export const UserEditFunc = createAsyncThunk(
  "UserEdit",
  async ({ updatedObj, userInfo }, { rejectWithValue }) => {
    console.log(userInfo);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.patch(URL, updatedObj, config);
   
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const UserEditSlice = createSlice({
  name: "UserEdit",
  initialState: {
    isloadingUserEdit: false,
    ResultUserEdit: {},
    errorUserEdit: "",
    isErrorUserEdit: false,
    isSuccessUserEdit: false,
  },
  reducers: {
    ClearStateUserEdit: (state) => {
      state.errorUserEdit = "";
      state.isErrorUserEdit = false;
      state.isSuccessUserEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserEditFunc.pending, (state) => {
        state.isloadingUserEdit = true;
        state.isErrorUserEdit = false;
        state.isSuccessUserEdit = false;
      })
      .addCase(UserEditFunc.fulfilled, (state, { payload }) => {
        state.isErrorUserEdit = false;
        state.isloadingUserEdit = false;
        state.isSuccessUserEdit = true;
        state.ResultUserEdit = payload;
      })
      .addCase(UserEditFunc.rejected, (state, { payload }) => {
        state.isloadingUserEdit = false;
        state.isErrorUserEdit = true;
        state.isSuccessUserEdit = false;
        state.errorUserEdit = payload;
      });
  },
});
export const { ClearStateUserEdit } = UserEditSlice.actions;
export default UserEditSlice.reducer;
