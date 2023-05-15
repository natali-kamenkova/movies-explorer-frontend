import React, {useEffect, useState} from "react";
import {
    LARGE_WIDTH,
    MEDIUM_WIDTH,
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
            setAmount(12);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(8);
        } else {
            setAmount(5);
        }
        return () => {
            window.removeEventListener("resize", screenWidthChange);
        };
    }, [width]);

    const handleMoreCards = () => {
        if (width >= LARGE_WIDTH) {
            setAmount(amount + 3);
        } else if (width >= MEDIUM_WIDTH) {
            setAmount(amount + 2);
        } else {
            setAmount(amount + 2);
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
