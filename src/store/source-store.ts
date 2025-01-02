import { createSlice } from '@reduxjs/toolkit'

const sourceSlice = createSlice({
  name: 'newsSource',
  initialState: {
    source: 'all'
  },
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
      // immer.js is used to update the state
      // return {
      //   ...state,
      //   source: action.payload
      // }
    },
  }
})

export const { setSource } = sourceSlice.actions;
export default sourceSlice.reducer;