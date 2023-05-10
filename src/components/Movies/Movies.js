import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import {movies} from "../../utils/Movies";

function Movies() {
    return (<section className="movies">
        <SearchForm/>
        <MoviesCardList movies={movies}/>
        <button className="movies__more-button">Еще</button>
    </section>);
}

export default Movies;
