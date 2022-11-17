import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField, selectSkills } from './skillSlice';
import styles from "./Skills.module.css";

export default function Skills() {
    const { items, loading, error, search } = useSelector(selectSkills);
    const dispatch = useDispatch();

    const hasQuery = search.trim() !== '';

    return (
      <div className={styles.container}>
        <div className={styles.search}>
          <input type="search" value={ search } onChange={ (e) => dispatch(changeSearchField(e.target.value)) } autoFocus />
        </div>
        {!hasQuery && <div>Type something to search...</div>}
        {hasQuery && loading && <div>searching...</div>}
        {error ? <div>Error occured: {error}</div>
          : <ul>{items.map(o => <li key={o.id}>{o.name}</li>)}</ul>}
      </div>
    );
};
