import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../api/firebase";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {},
  extraReducers: (builder) => {
    // 비동기 작업은 actionCreator 를 자동으로 만들어주지 못한다.
    builder
      //로딩중
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      //로딩완료
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "complete";
      })
      //로딩 실패
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    console.log(collectionName);
    console.log(queryOptions);
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log(error);
    }
  }
);

export default diarySlice;
export { fetchItems };
