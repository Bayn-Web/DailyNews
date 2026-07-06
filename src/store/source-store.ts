import { createSlice } from '@reduxjs/toolkit'

const sourceSlice = createSlice({
  name: 'newsSource',
  initialState: {
    source: 'all',
    cachedDay: ''
  },
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload
    },
    setCachedDay: (state, action) => {
      state.cachedDay = action.payload
    }
  }
})

export const { setSource, setCachedDay } = sourceSlice.actions;
export default sourceSlice.reducer;