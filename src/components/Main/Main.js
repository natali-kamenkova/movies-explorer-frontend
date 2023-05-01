import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import "./Main.css";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";

function Main() {
    return (<main className="main">
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
    </main>);
}

export default Main;
