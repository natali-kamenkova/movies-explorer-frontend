import React, {useEffect, useState} from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";
import {
    SHORT_MOVIES_DURATION,
    NOT_FOUND_SEARCH_MESSAGE,
} from "../../utils/constants";

function SavedMovies({movies, isLiked, handleDislike}) {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function search(movies, keyword, isChecked) {
        let result;
        let shortMoviesArray = movies;
        if (isChecked) {
            shortMoviesArray = shortMoviesArray.filter(
                (movie) => movie.duration <= SHORT_MOVIES_DURATION
            );
        }
        result = shortMoviesArray.filter((movie) => {
            return (
                movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        return result;
    }

    function submitSearchInSavedMovies(keyword, isChecked) {
        setTimeout(() => setIsLoading(false), 2000);
        const searchResult = search(movies, keyword, isChecked);
        setSearchedMovies(searchResult);
        setKeyword(keyword);
        setIsChecked(isChecked);
        setIsFinish(true);
        setErrorMessage("");
    }

    useEffect(() => {
        if (searchedMovies.length > 0) {
            const searchResult = search(movies, keyword, isChecked);
            setSearchedMovies(searchResult);
        }
    }, [movies, keyword, isChecked, searchedMovies.length]);

    return (
        <section className="saved-movies">
            <SearchForm
                handleSearch={submitSearchInSavedMovies}
                setPreloader={setIsLoading}
                isLoading={isLoading}
                errorMessage={errorMessage}
            />
            {isLoading ? (
                <Preloader/>
            ) : (
                <>
                    {movies.length === 0 ? (
                        <Preloader/>
                    ) : (
                        <>
                            {isFinish && movies.length !== 0 && searchedMovies.length === 0 ? (
                                <Preloader/>
                            ) : (
                                <MoviesCardList
                                    movies={isFinish ? searchedMovies : movies}
                                    handleDislike={handleDislike}
                                    isLiked={isLiked}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
}

export default SavedMovies;
