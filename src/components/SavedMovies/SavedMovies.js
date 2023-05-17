import React, {useEffect, useState} from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

import {
    DURATION_SHORT,
    MESSAGE_NO_KEY,
    MESSAGE_NOTHING_FOUND,
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
                (movie) => movie.duration <= DURATION_SHORT
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

    function submitSearchInSavedMovies(keyword, isChecked, checkboxIsTrigger) {
        if (!checkboxIsTrigger && keyword.length === 0) {
            setErrorMessage(MESSAGE_NO_KEY)
            return
        }
        setIsLoading(true);
        const searchResult = search(movies, keyword, isChecked);
        setSearchedMovies(searchResult);
        setKeyword(keyword);
        setIsChecked(isChecked);
        setIsFinish(true);
        setErrorMessage("");
        setIsLoading(false);
    }

    function textChanged() {
        setErrorMessage("")
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
                changed={textChanged}
            />
            {isLoading ? (
                <Preloader/>
            ) : (
                <>
                    {movies.length !== 0 && (
                        <MoviesCardList
                            movies={isFinish ? searchedMovies : movies}
                            handleDislike={handleDislike}
                            isLiked={isLiked}
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default SavedMovies;
