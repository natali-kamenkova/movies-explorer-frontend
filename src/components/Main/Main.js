import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import "./Main.css";

function Main() {
    return (<main className="main">
        <AboutProject/>
        <AboutMe/>
    </main>);
}

export default Main;
