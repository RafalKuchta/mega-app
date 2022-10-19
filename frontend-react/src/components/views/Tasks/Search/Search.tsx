import React, {useContext} from 'react';
import {SearchContext} from "../../../../context/search.context";
import './Search.css';

export const Search = () => {
    const {search, setSearch} = useContext(SearchContext);

    return (
        <div className="wrapper-search">
            <input
                type="text"
                className="search-input"
                placeholder="Szukaj zadania..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    );
};
