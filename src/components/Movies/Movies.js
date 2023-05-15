import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

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
                    {movies.length !== 0 && (
                        <MoviesCardList
                            movies={movies}
                            handleLike={handleLike}
                            handleDislike={handleDislike}
                            isLiked={isLiked}
                            sortingMovies={sortingMovies}
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default Movies;
