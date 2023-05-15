import React, {useEffect, useState} from "react";
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import success from "../../images/success.svg";
import wrong from "../../images/wrong.svg";

import {auth} from "../../utils/auth";
import {mainApi} from "../../utils/MainApi";
import {moviesApi} from "../../utils/MoviesApi";

import {
    CONFLICT_ERROR,
    MESSAGE_EMAIL_ALREADY_EXISTS,
    MESSAGE_CANT_LIKE,
    MESSAGE_LOGIN_FAIL,
    MESSAGE_REGISTER_FAIL,
    MESSAGE_UPDATE_FAIL,
    INTERNAL_SERVER_ERROR,
    MESSAGE_INTERNAL_ERROR,
    MESSAGE_NO_KEY,
    MESSAGE_NOTHING_FOUND,
    DURATION_SHORT,
    MESSAGE_USER_UPDATED,
    MESSAGE_WELCOME
} from "../../utils/constants";

function App() {
    const location = useLocation();
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(!!JSON.parse(localStorage.getItem("loggedIn")));
    const [currentUser, setCurrentUser] = useState({});
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
    const [isImageForInfoTooltip, setIsImageForInfoTooltip] = useState("");
    const [isTextForInfoTooltip, setIsTextForInfoTooltip] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageInRegister, setErrorMessageInRegister] = useState("");
    const [errorMessageInSearch, setErrorMessageInSearch] = useState("");
    const [errorMessageInProfile, setErrorMessageInProfile] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [beatFilmMovies, setBeatFilmMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [favoriteMovies, setIsFavoriteMovies] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    function checkToken() {
        const token = localStorage.getItem("token");
        if (token) {
            auth
                .checkToken(token)
                .then(() => {
                    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                    setLoggedIn(true);
                })
                .catch(() => {
                    handleExitSubmit();
                });
        }
    }

    useEffect(() => {
        if (loggedIn) {
            Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
                .then(([userInfo, favoriteMovies]) => {
                    setCurrentUser(userInfo);
                    setIsFavoriteMovies(favoriteMovies);
                })
                .catch((err) => {
                    setIsOpenInfoTooltip(true);
                    setIsImageForInfoTooltip(wrong);
                    setIsTextForInfoTooltip(err);
                    setTimeout(() => {
                        setIsOpenInfoTooltip(false);
                    }, 2000);
                });
        }
    }, [loggedIn]);

    function handleRegisterSubmit(name, email, password) {
        setIsLoading(true);
        auth
            .register(name, email, password)
            .then(() => {
                setIsLoading(false);
                handleLoginSubmit(email, password);
                setErrorMessageInRegister("");
            })
            .then(() => history.push("/movies"))
            .catch((err) => {
                if (err.includes(CONFLICT_ERROR)) {
                    setErrorMessageInRegister(MESSAGE_EMAIL_ALREADY_EXISTS);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                } else if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessageInRegister(MESSAGE_INTERNAL_ERROR);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                } else {
                    setErrorMessageInRegister(MESSAGE_REGISTER_FAIL);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                }
            });
    }

    function handleLoginSubmit(email, password) {
        setIsLoading(true);
        auth
            .login(email, password)
            .then((res) => {
                setIsLoading(false);
                localStorage.setItem("token", res.token);
                setLoggedIn(true);
                setIsOpenInfoTooltip(true);
                setErrorMessage("");
                setIsImageForInfoTooltip(success);
                setIsTextForInfoTooltip(MESSAGE_WELCOME);
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                }, 2000);
            })
            .then(() => history.push("/movies"))
            .catch((err) => {
                if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessage(MESSAGE_INTERNAL_ERROR);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1500);
                } else {
                    setErrorMessage(MESSAGE_LOGIN_FAIL);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1500);
                }
            });
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        mainApi
            .editProfile(data)
            .then((userData) => {
                setCurrentUser(userData);
                setIsOpenInfoTooltip(true);
                setIsImageForInfoTooltip(success);
                setIsTextForInfoTooltip(MESSAGE_USER_UPDATED);
                setErrorMessageInProfile("");
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                    setIsLoading(false);
                }, 1500);
            })
            .catch((err) => {
                if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessageInProfile(MESSAGE_INTERNAL_ERROR);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInProfile("");
                    }, 1500);
                } else {
                    setErrorMessageInProfile(MESSAGE_UPDATE_FAIL);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInProfile("");
                    }, 1500);
                }
            });
    }

    function closeInfoTooltip() {
        setIsOpenInfoTooltip(false);
    }

    function handleExitSubmit() {
        localStorage.removeItem("token");
        localStorage.removeItem("searchedMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("keyword");
        localStorage.removeItem("isChecked");
        setBeatFilmMovies([]);
        setIsFavoriteMovies([]);
        setSearchedMovies([]);
        setKeyword("");
        setErrorMessage("");
        setLoggedIn(false);
        setSearchResult("");
        setCurrentUser({});
        history.push("/");
    }

    useEffect(() => {
        checkLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, isChecked]);

    function checkLocalStorage() {
        const result = localStorage.getItem("searchedMovies");
        if (result) {
            const movies = JSON.parse(localStorage.getItem("searchedMovies"));
            const result = search(movies, keyword, isChecked);
            localStorage.setItem("searchedMovies", JSON.stringify(result));
            setSearchedMovies(result);
        }
    }

    useEffect(() => {
        if (beatFilmMovies.length > 0) {
            const movies = search(beatFilmMovies, keyword, isChecked);
            localStorage.setItem("searchedMovies", JSON.stringify(movies));
            localStorage.setItem("keyword", keyword);
            localStorage.setItem("isChecked", isChecked);
            setSearchedMovies(movies);
        }
    }, [beatFilmMovies, keyword, isChecked]);

    function submitSearch(keyword, isChecked) {
        if (keyword !== "") {
            setTimeout(() => setIsLoading(false), 2000);
            setErrorMessage("");
            setKeyword(keyword);
            setIsChecked(isChecked);
            const movies = JSON.parse(localStorage.getItem("movies"));
            if (!movies) {
                setIsLoading(true);
                getBeatMovies();
            } else {
                setBeatFilmMovies(movies);
            }
        } else {
            setTimeout(() => setIsLoading(false), 1000);
            setErrorMessageInSearch(MESSAGE_NO_KEY);
            setSearchedMovies([]);
        }
    }

    function getBeatMovies() {
        setIsLoading(true);
        moviesApi
            .getBeatfilmMovies()
            .then((data) => {
                localStorage.setItem("movies", JSON.stringify(data));
                setBeatFilmMovies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsOpenInfoTooltip(true);
                setIsImageForInfoTooltip(wrong);
                setIsTextForInfoTooltip(err);
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                }, 2000);
            });
    }

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
        if (result.length === 0) {
            setSearchResult(MESSAGE_NOTHING_FOUND);
        }
        return result;
    }

    const handleLikeClick = (movie) => {
        const like = favoriteMovies?.find((i) => i?.movieId === movie.id);
        if (!like) {
            mainApi
                .createMovie(movie)
                .then((res) => {
                    setIsFavoriteMovies((movies) => [...movies, res]);
                })
                .catch((err) => {
                    if (err.includes(CONFLICT_ERROR)) {
                        handleExitSubmit();
                        setIsOpenInfoTooltip(true);
                        setIsImageForInfoTooltip(wrong);
                        setIsTextForInfoTooltip(MESSAGE_CANT_LIKE);
                        setTimeout(() => {
                            setIsOpenInfoTooltip(false);
                        }, 2000);
                    } else {
                        setIsOpenInfoTooltip(true);
                        setIsImageForInfoTooltip(wrong);
                        setIsTextForInfoTooltip(MESSAGE_INTERNAL_ERROR);
                        setTimeout(() => {
                            setIsOpenInfoTooltip(false);
                        }, 2000);
                    }
                });
        } else {
            const dislike = favoriteMovies.find((i) => i?.movieId === movie.id);
            handleDislikeClick(dislike);
        }
    };
    
    function textChanged() {
        setErrorMessageInSearch("")
    }

    function handleDislikeClick(movie) {
        mainApi
            .deleteMovie(movie._id)
            .then(() => {
                setIsFavoriteMovies(
                    favoriteMovies.filter((data) => data._id !== movie._id)
                );
            })
            .catch(() => {
                setIsOpenInfoTooltip(true);
                setIsImageForInfoTooltip(wrong);
                setIsTextForInfoTooltip(MESSAGE_INTERNAL_ERROR);
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                }, 2000);
            });
    }

    const isLiked = (data) => {
        return favoriteMovies?.find((i) => i?.movieId === data.id);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                {location.pathname === "/" ||
                location.pathname === "/movies" ||
                location.pathname === "/saved-movies" ||
                location.pathname === "/profile" ? (
                    <Header loggedIn={loggedIn}/>
                ) : (
                    ""
                )}
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <ProtectedRoute
                        exact
                        path="/movies"
                        loggedIn={loggedIn}
                        component={Movies}
                        handleSearch={submitSearch}
                        isLoading={isLoading}
                        movies={searchedMovies}
                        handleLike={handleLikeClick}
                        handleDislike={handleDislikeClick}
                        isLiked={isLiked}
                        errorMessage={errorMessageInSearch}
                        setPreloader={setIsLoading}
                        searchResult={searchResult}
                        changed={textChanged}
                    />
                    <ProtectedRoute
                        exact
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                        movies={favoriteMovies}
                        isLiked={isLiked}
                        handleDislike={handleDislikeClick}
                    />
                    <ProtectedRoute
                        exact
                        path="/profile"
                        onUpdateUser={handleUpdateUser}
                        handleExit={handleExitSubmit}
                        loggedIn={loggedIn}
                        component={Profile}
                        errorMessage={errorMessage}
                        isLoading={isLoading}
                    />
                    <Route exact path="/signin">
                        {loggedIn ? (
                            <Redirect to="/movies"/>
                        ) : (
                            <Login
                                handleLogin={handleLoginSubmit}
                                errorMessage={errorMessage}
                                isLoading={isLoading}
                            />
                        )}
                    </Route>
                    <Route exact path="/signup">
                        {loggedIn ? (
                            <Redirect to="/movies"/>
                        ) : (
                            <Register
                                handleRegister={handleRegisterSubmit}
                                errorMessage={errorMessageInRegister}
                                isLoading={isLoading}
                            />
                        )}
                    </Route>
                    <Route path="/*">
                        <PageNotFound/>
                    </Route>
                </Switch>
                {location.pathname === "/" ||
                location.pathname === "/movies" ||
                location.pathname === "/saved-movies" ? (
                    <Footer/>
                ) : (
                    ""
                )}
                <InfoTooltip
                    isOpen={isOpenInfoTooltip}
                    onClose={closeInfoTooltip}
                    image={isImageForInfoTooltip}
                    text={isTextForInfoTooltip}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
