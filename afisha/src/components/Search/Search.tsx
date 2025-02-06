import {KeyboardEvent, ChangeEvent, useState} from 'react';
import style from './style.module.scss'
import {FilterType} from "../FilterType/FilterType.tsx";

export interface ISearch {
    searchMovies: (params: {query: string, filterType: 'all' | 'movie' | 'series' | 'game'}) => void
    query: string;
    type: 'all' | 'movie' | 'series' | 'game';
}

const Search = ({searchMovies, query, type: parentType}: ISearch) => {
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<'all' | 'movie' | 'series' | 'game'>(parentType || 'all');


    const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchMovies({query: search, filterType: type});
        }
    }

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const filterType = event.target.dataset.type as 'all' | 'movie' | 'series' | 'game';
        setType(filterType);
        searchMovies({query: search || query, filterType})
    }


    return (

        <div className={style.row}>
            <div className={style.inputField}>
                <input
                    className={`${style.inputStyle}`}
                    placeholder="Search"
                    type="search"
                    value={search || ''}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    onKeyDown={handleKey}
                />
                <button
                    className={`${style.btn} ${style.searchBtn} ${style.btnReset}`}
                    onClick={() => {
                        searchMovies({query: search, filterType: type});
                    }}
                >
                    Поиск
                </button>

                <FilterType type={type} handleFilter={handleFilter} />
            </div>
        </div>
    );

}

export {Search};