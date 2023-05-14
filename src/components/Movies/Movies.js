import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import UserInfo from "../UserInfo/UserInfo";
import "./Movies.css";
import {START_HINT} from "../../utils/constants";

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
                }) {
    return (
        <section className="movies">
            <SearchForm
                onCheckboxToggle={onCheckboxToggle}
                isLoading={isLoading}
                isChecked={isChecked}
                setPreloader={setPreloader}
                errorMessage={errorMessage}
                handleSearch={handleSearch}
            />
            {isLoading ? (
                <Preloader/>
            ) : (
                <>
                    {searchResult
                        ? movies.length === 0 && (
                        <UserInfo image={} title={searchResult}/>
                    )
                        : movies.length === 0 && (
                        <UserInfo image={} title={START_HINT}/>
                    )}

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
