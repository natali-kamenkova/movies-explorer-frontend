import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import {
    MESSAGE_NOTHING_FOUND,
} from "../../utils/constants";

function Movies({
                    handleSearch,
                    isLoading,
                    setPreloader,
                    errorMessage,
                    isChecked,
                    onCheckboxToggle,
                    movies,
                    handleLike,
                    handleDislike,
                    isLiked,
                    sortingMovies,
                    searchResult,
                    changed,
                }) {
    return (
        <section className="movies">
            <SearchForm
                onCheckboxToggle={onCheckboxToggle}
                isLoading={isLoading}
                isChecked={isChecked}
                changed={changed}
                setPreloader={setPreloader}
                errorMessage={errorMessage}
                handleSearch={handleSearch}
            />

            {isLoading ? (
                <Preloader/>
            ) : (
                <>
                    {movies.length !== 0 ? (
                        <MoviesCardList
                            movies={movies}
                            handleLike={handleLike}
                            handleDislike={handleDislike}
                            isLiked={isLiked}
                            sortingMovies={sortingMovies}
                            showAll={false}
                        />
                    ) : (
                        <span className="search-form__error" id="keywords-error">{MESSAGE_NOTHING_FOUND}</span>
                    )}
                </>
            )}
        </section>
    );
}

export default Movies;
