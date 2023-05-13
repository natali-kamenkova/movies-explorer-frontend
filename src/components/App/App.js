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
    CONFLICT_MESSAGE,
    DEFAULT_MESSAGE_LOGIN,
    DEFAULT_MESSAGE_REGISTER,
    DEFAULT_MESSAGE_UPDATE,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_MESSAGE,
    SUCCESSFUL_UPDATE_MESSAGE,
    WELCOME_MESSAGE,
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
                    setCurrentUser(userInfo.data);
                    setIsFavoriteMovies(favoriteMovies.data);
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

    // регистрация
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
                    setErrorMessageInRegister(CONFLICT_MESSAGE);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                } else if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessageInRegister(INTERNAL_SERVER_MESSAGE);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                } else {
                    setErrorMessageInRegister(DEFAULT_MESSAGE_REGISTER);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInRegister("");
                    }, 1500);
                }
            });
    }

    // вход
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
                setIsTextForInfoTooltip(WELCOME_MESSAGE);
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                }, 2000);
            })
            .then(() => history.push("/movies"))
            .catch((err) => {
                if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessage(INTERNAL_SERVER_MESSAGE);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1500);
                } else {
                    setErrorMessage(DEFAULT_MESSAGE_LOGIN);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1500);
                }
            });
    }

    // редактирование
    function handleUpdateUser(data) {
        setIsLoading(true);
        mainApi
            .editProfile(data)
            .then((userData) => {
                setCurrentUser(userData.data);
                setIsOpenInfoTooltip(true);
                setIsImageForInfoTooltip(success);
                setIsTextForInfoTooltip(SUCCESSFUL_UPDATE_MESSAGE);
                setErrorMessageInProfile("");
                setTimeout(() => {
                    setIsOpenInfoTooltip(false);
                    setIsLoading(false);
                }, 1500);
            })
            .catch((err) => {
                if (err.includes(INTERNAL_SERVER_ERROR)) {
                    setErrorMessageInProfile(INTERNAL_SERVER_MESSAGE);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInProfile("");
                    }, 1500);
                } else {
                    setErrorMessageInProfile(DEFAULT_MESSAGE_UPDATE);
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessageInProfile("");
                    }, 1500);
                }
            });
    }

    // исчезнование
    function closeInfoTooltip() {
        setIsOpenInfoTooltip(false);
    }

    // выход
    function handleExitSubmit() {
        localStorage.removeItem("token"); // удаляем токен
        localStorage.removeItem("searchedMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("keyword");
        localStorage.removeItem("isChecked");
        setBeatFilmMovies([]); // нет массива фильмов со стороннего ресурса
        setIsFavoriteMovies([]); // нет массива любимых фильмов
        setSearchedMovies([]); // нет найдены фильмов
        setKeyword(""); // нет ключевых слов
        setErrorMessage(""); // нет ошибки при регистрации и тд
        setLoggedIn(false); // не залогинен
        setSearchResult(""); // не результатов поиска
        setCurrentUser({});
        history.push("/"); // отправляем на главную страницу
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
