import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import AuthSlice from "../Slice/AuthSlice";
import ResetPassSlice from "../Slice/ResetPassSlice";
import UserEditSlice from "../Slice/UserEditSlice";
import UserListSlice from "../Slice/UserListSlice";
import CompanyRegSlice from "../Slice/CompanyRegSlice";
import SideBarControlerSlice from "../Slice/SideBarControlSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  compreg: CompanyRegSlice,
  userlist: UserListSlice,
  useredit: UserEditSlice,
  controlSideBar: SideBarControlerSlice,
  resetpass: ResetPassSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }), // Correctly setting middleware,
});

export const persistor = persistStore(store);
