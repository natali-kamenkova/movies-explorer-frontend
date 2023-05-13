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
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageInRegister, setErrorMessageInRegister] = useState("");
    const [errorMessageInProfile, setErrorMessageInProfile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function isNeedHeader() {
        return (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile');
    }

    function isNeedFooter() {
        return (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies');
    }


    return (<div className="page">
        {isNeedHeader() ? (<Header/>) : ("")}
        <Switch>
            <Route exact path="/">
                <Main/>
            </Route>
            <Route exact path="/signup">
                <Register/>
            </Route>
            <Route exact path="/signin">
                <Login/>
            </Route>
            <Route exact path="/profile">
                <Profile/>
            </Route>
            <Route exact path="/movies">
                <Movies/>
            </Route>
            <Route exact path="/saved-movies">
                <SavedMovies/>
            </Route>
            <Route path="/*">
                <PageNotFound/>
            </Route>
        </Switch>
        {isNeedFooter() ? (<Footer/>) : ("")}
    </div>);
}

export default App;
