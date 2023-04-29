import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
    const location = useLocation();

    function isNeedHeader() {
        return (
            location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies' ||
            location.pathname === '/profile'
        );
    }

    function isNeedFooter() {
        return (
            location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies'
        );
    }


    return (
        <div className="page">
            {isNeedHeader() ? (<Header/>) : ("")}
            <Switch>
                {/*<Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/movies">
                    <Movies/>
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route exact path="/profile">
                    <Profile/>
                </Route>
                <Route exact path="/signin">
                    <Login/>
                </Route>
                <Route exact path="/signup">
                    <Register/>
                </Route>*/}
                <Route path="/*">
                    <PageNotFound/>
                </Route>
            </Switch>
            {isNeedFooter() ? (<Footer/>) : ("")}
        </div>
    );
}

export default App;
