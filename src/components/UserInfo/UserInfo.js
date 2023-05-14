import React from "react";
import "./UserInfo.css";

function UserInfo({image, title}) {
    return (
        <div className="user-info">
            <img className="user-info__image" src={image} alt={title}/>
            <h4 className="user-info__title">{title}</h4>
        </div>
    );
}

export default UserInfo;