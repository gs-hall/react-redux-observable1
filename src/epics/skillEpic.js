//import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, retry, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { changeSearchField, searchRequest, searchSuccess, searchFailure } from '../features/skills/skillSlice';
import { of } from 'rxjs';

export const changeSearchEpic = (action$) => action$.pipe(
    filter(changeSearchField.match),
    //tap(o => console.log('changeSearchEpic', o, o.payload)),
    map(o => o.payload.trim()),
    filter(o => o !== ''),
    //tap(o => console.log('changeSearchEpic', o)),
    debounceTime(500),
    map(o => searchRequest(o))
)

export const searchSkillsEpic = action$ => action$.pipe(
    filter(searchRequest.match),
    map(o => o.payload),
    //tap(o => console.log('searchSkillsEpic', o)),
    map(o => new URLSearchParams({ q: o })),
    //tap(o => console.log('loading...', o)),
    switchMap(o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`)
      .pipe(
        retry(2),
        map(o => searchSuccess(o)),
        catchError(e => of(searchFailure(e.message)))
  ))
);