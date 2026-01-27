import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resume : localStorage.getItem("extractedtext") || null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState ,


  reducers: {
    setResumeText: (state, action) => {
      state.resumeText = action.payload;
    },
    setEditedResumeText: (state, action) => {
      state.editedResumeText = action.payload;
    },
    clearResume: (state) => {
      state.resumeText = "";
      state.editedResumeText = "";
    },
  },
});

export const { setResumeText, setEditedResumeText, clearResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
