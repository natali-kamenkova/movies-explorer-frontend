import React from "react";
import {useState} from "react";
import "./Header.css";
import logo from "../../images/logo1.png";
import profile from "../../images/profile.png";
import {Link, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
    const [openNavigation, setIsOpenBurgerMenu] = useState(false);

    const location = useLocation();

    function handleBurgerMenuButton() {
        setIsOpenBurgerMenu(!openNavigation);
    }

    const headerClassName = `header ${location.pathname === "/" ? "header_color_dark" : "header_color_white"}`;

    return (<header className={headerClassName}>
        <div className="header__container">
            <Link to="/">
                <img className="logo" src={logo} alt="Логотип"/>
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
                ) : (<>
                    <Link
                        to="/movies"
                        className="header__link header__link_color_dark header__link_hidden"
                    >
                        Фильмы
                    </Link>
                    <Link
                        to="/saved-movies"
                        className="header__link header__link_right header__link_color_dark header__link_hidden"
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
                </>)}
            </div>
        </div>
        {openNavigation ? (<Navigation handleBurgerMenuButton={handleBurgerMenuButton}/>) : ("")}
    </header>);
}

export default Header;
