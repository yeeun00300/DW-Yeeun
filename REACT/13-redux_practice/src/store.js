import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { render } from "@testing-library/react";
export const store = configureStore({
  reducer: counterSlice.reducer,
  //reducer : 슬리이스의 리듀서 적어주기
});
