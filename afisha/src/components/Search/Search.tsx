import React, {useState} from 'react';
import style from './style.module.scss'

interface ISearch {
    searchMovies: (params: {str: string, filterType: 'all' | 'movie' | 'series' | 'game'}) => void
    query: string;
    type: 'all' | 'movie' | 'series' | 'game';
}

const Search = ({searchMovies, query, type: parentType}: ISearch) => {
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<'all' | 'movie' | 'series' | 'game'>(parentType || 'all');


    const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchMovies({str: search, filterType: type});
        }
    }

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterType = event.target.dataset.type as 'all' | 'movie' | 'series' | 'game';
        setType(filterType);
        searchMovies({str: search || query, filterType})
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
                        searchMovies({str: search, filterType: type});
                    }}
                >
                    Search
                </button>
                <div className={`${style.flex} ${style.btnsBox}`}>
                    <label className={`${style.withGap} ${style.radioButtonsStandart}`}>
                        <input
                            // className={`${style.radioButtonsStandart}`}
                            name="type"
                            type="radio"
                            data-type="all"
                            onChange={handleFilter}
                            checked={type === "all"}
                        />
                        <span className={style.span}>All</span>
                    </label>

                    <label className={`${style.withGap} ${style.radioButtonsStandart}`}>
                        <input
                            // className={`${style.radioButtonsStandart}`}
                            name="type"
                            type="radio"
                            data-type="movie"
                            onChange={handleFilter}
                            checked={type === "movie"}
                        />
                        <span className={style.span}>Movie</span>
                    </label>

                    <label className={`${style.withGap} ${style.radioButtonsStandart}`}>
                        <input
                            // className={`${style.radioButtonsStandart}`}
                            name="type"
                            type="radio"
                            data-type="series"
                            onChange={handleFilter}
                            checked={type === "series"}
                        />
                        <span className={style.span}>Series</span>
                    </label>

                    <label className={`${style.withGap} ${style.radioButtonsStandart}`}>
                        <input
                            // className={`${style.radioButtonsStandart}`}
                            name="type"
                            type="radio"
                            data-type="game"
                            onChange={handleFilter}
                            checked={type === "game"}
                        />
                        <span className={style.span}>Game</span>
                    </label>
                </div>
            </div>
        </div>
    );

}

export {Search};