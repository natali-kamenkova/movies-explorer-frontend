import React from "react";
import "./AboutMe.css";
import photo from "../../images/my_photo.jpeg";

function AboutMe() {
    return (<section className="about-me" id="about_me">
            <h2 className="about-me__text" name="about-me">
                Студент
            </h2>
            <div className="about-me__info">
                <div className="about-me__info-text">
                    <p className="about-me__name">Наталия</p>
                    <p className="about-me__about">Фронтенд-разработчик, 51 год</p>
                    <p className="about-me__description">
                        Родилась в городе Ростове на Длну.
                    </p>
                    <a className="about-me__github" href="https://github.com/natali-kamenkova">
                        Github
                    </a>
                </div>
                <img className="about-me__photo" src={photo} alt="Фотография автора"/>
            </div>
        </section>);
}

export default AboutMe;