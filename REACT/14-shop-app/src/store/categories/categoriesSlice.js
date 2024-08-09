import { createSlice } from "@reduxjs/toolkit";
import { CategoriesName } from "./categories";

const initialState = CategoriesName.All;
// initialState 가 단일 값이면 리듀서에 바로 리턴으로 써줌

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { setActiveCategory } = categoriesSlice.actions;
