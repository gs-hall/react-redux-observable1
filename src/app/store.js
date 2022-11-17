import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import skillReducer from '../features/skills/skillSlice';
import { changeSearchEpic, searchSkillsEpic } from '../epics/skillEpic';

const epics = combineEpics(
  changeSearchEpic,
  searchSkillsEpic,
);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    skills: skillReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

epicMiddleware.run(epics);