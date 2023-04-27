import React from "react";
import {useState} from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import {Link, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
    const [openNavigation, setIsOpenBurgerMenu] = useState(false);

    const location = useLocation();
    const headerClassName = `header ${location.pathname === "/" ? "header_color_emerald" : "header_color_dark"}`;

    function handleBurgerMenuButton() {
        setIsOpenBurgerMenu(!openNavigation);
    }

    return (
        <header className={headerClassName}>
            <div className="header__container">
                <Link to="/">
                    <img className="logo" src={logo} alt="Логотоп"/>
                </Link>
                <div className="header__links">
                    {location.pathname === "/" ? ( // main
                        <>
                            <Link
                                to="/signup"
                                className="header__link header__link_color_white"
                            >
                                Регистрация
                            </Link>
                            <Link
                                to="/signin"
                                className="header__link header__link_color_green"
                            >
                                Войти
                            </Link>
                        </> // others
                    ) : (
                        <>
                            <Link
                                to="/movies"
                                className="header__link header__link_color_white header__link_hidden"
                            >
                                Фильмы
                            </Link>
                            <Link
                                to="/saved-movies"
                                className="header__link header__link_right header__link_color_white header__link_hidden"
                            >
                                Сохранённые фильмы
                            </Link>
                            <Link to="/profile" className="header__link">
                                <img
                                    className="header__link-image header__link_hidden"
                                    src={profile}
                                    alt="Профиль"
                                />
                            </Link>
                            <button
                                aria-label="Open navigation"
                                className="header__burger-menu"
                                type="button"
                                onClick={handleBurgerMenuButton}
                            />
                        </>
                    )}
                </div>
            </div>
            {openNavigation ? (<Navigation handleBurgerMenuButton={handleBurgerMenuButton}/>) : ("")}
        </header>
    );
}

export default Header;
