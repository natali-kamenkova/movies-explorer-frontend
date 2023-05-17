import React, {useEffect, useState} from "react";
import {
    LARGE_WIDTH,
    LARGE_WIDTH_LOAD,
    LARGE_WIDTH_EXTRA_LOAD,
    MEDIUM_WIDTH,
    MEDIUM_WIDTH_LOAD,
    MEDIUM_WIDTH_EXTRA_LOAD,
    SMALL_WIDTH_LOAD,
    SMALL_WIDTH_EXTRA_LOAD
} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({movies, isLiked, handleLike, handleDislike, showAll}) {
    const [width, setWidth] = useState(0);
    const [amount, setAmount] = useState(0);
    const part = showAll ? movies : movies.slice(0, amount);

    function screenWidthChange() {
        setTimeout(() => {
            setWidth(window.innerWidth);
        }, 500);
    }

    useEffect(() => {
        window.addEventListener("resize", screenWidthChange);
        setWidth(window.innerWidth);
        if (width >= LARGE_WIDTH) {
            setAmount(LARGE_WIDTH_LOAD);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(MEDIUM_WIDTH_LOAD);
        } else {
            setAmount(SMALL_WIDTH_LOAD);
        }
        return () => {
            window.removeEventListener("resize", screenWidthChange);
        };
    }, [width]);

    const handleMoreCards = () => {
        if (width >= LARGE_WIDTH) {
            setAmount(amount + LARGE_WIDTH_EXTRA_LOAD);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(amount + MEDIUM_WIDTH_EXTRA_LOAD);
        } else {
            setAmount(amount + SMALL_WIDTH_EXTRA_LOAD);
        }
    };

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__movies">
                {part.map((movie) => (
                    <MoviesCard
                        key={movie._id || movie.id}
                        movie={movie}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        isLiked={isLiked}
                    />
                ))}
            </ul>
            {(showAll || amount >= movies.length) ? null : (
                <button
                    className="movies-card-list__more-button"
                    aria-label="Load more movies"
                    onClick={handleMoreCards}
                >
                    Еще
                </button>
            )}
        </section>
    );
}

export default MoviesCardList;
