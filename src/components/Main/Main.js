import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import "./Main.css";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
    return (<main className="main">
        <Promo/>
        <AboutProject/>
        <AboutMe/>
        <Techs />
    </main>);
}

export default Main;
