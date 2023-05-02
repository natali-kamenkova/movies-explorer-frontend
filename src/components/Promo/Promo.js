import React from "react";
import "./Promo.css";
import promo from "../../images/promo.png";

function Promo() {
    return (<section className="promo">
        <h1 className="promo__text">
            Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className="promo__logo" src={promo} alt="Логотип"/>
    </section>);
}

export default Promo;
