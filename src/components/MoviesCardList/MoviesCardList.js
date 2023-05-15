import React, {useEffect, useState} from "react";
import {
    MAX_LOAD,
    LARGE_WIDTH,
    MED_LOAD,
    MEDIUM_WIDTH,
    MIN_LOAD,
} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({movies, isLiked, handleLike, handleDislike}) {
    const [width, setWidth] = useState(0);
    const [amount, setAmount] = useState(0);
    const part = movies.slice(0, amount);

    function screenWidthChange() {
        setTimeout(() => {
            setWidth(window.innerWidth);
        }, 500);
    }

    useEffect(() => {
        window.addEventListener("resize", screenWidthChange);
        setWidth(window.innerWidth);
        if (width >= LARGE_WIDTH) {
            setAmount(MAX_LOAD);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(MED_LOAD);
        } else {
            setAmount(MIN_LOAD);
        }
        return () => {
            window.removeEventListener("resize", screenWidthChange);
        };
    }, [width]);

    const handleMoreCards = () => {
        if (width >= LARGE_WIDTH) {
            setAmount(amount + MAX_LOAD);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(amount + MED_LOAD);
        } else {
            setAmount(amount + MIN_LOAD);
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
            {amount >= movies.length ? null : (
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
