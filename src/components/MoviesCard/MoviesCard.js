import React from "react";
import {useLocation} from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({movie, isLiked, handleLike, handleDislike}) {
    const location = useLocation();
    const cardLikeButtonClassName = (`card__like ${isLiked(movie) ? 'card__like_active' : ''}`);

    function handleLikeClick() {
        handleLike(movie);
    }

    function handleDislikeClick() {
        handleDislike(movie);
    }

    return (
        <div className="card">
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__image"
                     src={location.pathname === "/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                     alt={movie.nameRU}/>
            </a>
            <div className="card__container">
                <h3 className="card__title">{movie.nameRU}</h3>
                {location.pathname === "/movies" ? (
                    <button
                        aria-label="Like card"
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={!isLiked ? handleDislikeClick : handleLikeClick}
                    />
                ) : (
                    <button
                        aria-label="Delete card"
                        className="card__delete"
                        type="button"
                        onClick={handleDislikeClick}
                    />
                )}
            </div>
        </div>
    );
}

export default MoviesCard;
