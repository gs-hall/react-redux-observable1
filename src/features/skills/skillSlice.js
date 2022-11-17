import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: ''
};

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    changeSearchField: (state, action) => {
      const search = action.payload;
      if (search === '') { // cancel search -> clear all
        //console.log('return to innocence');
        return initialState;
      };
      state.search = search;
    },

    searchRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      //console.log('searchRequest', action.payload);
      //return { ...state, loading: true, error: null};
    },
    searchFailure: (state, action) => {
      //console.log('searchFailure', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    searchSuccess: (state, action) => {
      //console.log('searchSuccess', action.payload);
      state.items = action.payload;
      state.loading = false;
      state.error = null;
      //return { ...state, items, loading: false, error: null };
    }
  }
});

export const { searchRequest, searchFailure, searchSuccess, changeSearchField } = skillSlice.actions;

export const selectSkills = (state) => state.skills;

export default skillSlice.reducer;