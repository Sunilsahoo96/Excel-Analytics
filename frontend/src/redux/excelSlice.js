import { createSlice } from '@reduxjs/toolkit';

const excelSlice = createSlice({
  name: 'excel',
  initialState: {
    data: [] // Store parsed Excel data here
  },
  reducers: {
    setExcelData: (state, action) => {
      state.data = action.payload; // Store the parsed data
    }
  }
});

export const { setExcelData } = excelSlice.actions;
export default excelSlice.reducer;
