import React, {useState} from 'react';

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

        <div className="row">
            <div className="input-field">
                <input
                    className="validate"
                    placeholder="search"
                    type="search"
                    value={search || ''}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    onKeyDown={handleKey}
                />
                <button
                    className="btn search-btn"
                    onClick={() => {
                        searchMovies({str: search, filterType: type});
                    }}
                >
                    Поиск
                </button>
                <div className='radio_buttons'>
                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            type="radio"
                            data-type="all"
                            onChange={handleFilter}
                            checked={type === "all"}
                        />
                        <span>Все</span>
                    </label>

                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            type="radio"
                            data-type="movie"
                            onChange={handleFilter}
                            checked={type === "movie"}
                        />
                        <span>Фильмы</span>
                    </label>

                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            type="radio"
                            data-type="series"
                            onChange={handleFilter}
                            checked={type === "series"}
                        />
                        <span>Серии</span>
                    </label>

                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            type="radio"
                            data-type="game"
                            onChange={handleFilter}
                            checked={type === "game"}
                        />
                        <span>Игры</span>
                    </label>
                </div>
            </div>
        </div>
    );

}

export {Search};