import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/user-routes/user-details`;

export const UserListFunc = createAsyncThunk(
  "UserList",
  async (userdata, { rejectWithValue }) => {
    try {
      const config = {
        user: {
          User_Type:userdata?.data?.utype
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userdata?.token}`,
        },
      };
    //  console.log(userdata, config, "hi");
      const { data } = await axios({
        url: URL,
        method: "get",
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
          "Content-Type": "application/json",
        },
      });
      return data?.data?.UserDetails;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const UserListSlice = createSlice({
  name: "UserList",
  initialState: {
    isloading16: false,
    Result16: [],
    error16: "",
    isError16: false,
    isSuccess16: false,
  },
  reducers: {
    ClearState16: (state) => {
      state.error16 = "";
      state.isError16 = false;
      state.isSuccess16 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserListFunc.pending, (state) => {
        state.isloading16 = true;
        state.isError16 = false;
        state.isSuccess16 = false;
      })
      .addCase(UserListFunc.fulfilled, (state, { payload }) => {
        state.isError16 = false;
        state.isloading16 = false;
        state.isSuccess16 = true;
        state.Result16 = payload;
      })
      .addCase(UserListFunc.rejected, (state, { payload }) => {
        state.isloading16 = false;
        state.isError16 = true;
        state.isSuccess16 = false;
        state.error16 = payload;
      });
  },
});
export const { ClearState16 } = UserListSlice.actions;
export default UserListSlice.reducer;
