import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const getActiveButtonsState = (path) => {
    const result = ["", "", "", ""];
    const pathArray = ["/movies", "/theaters", "/news", "/account"]
    const id = pathArray.indexOf(path);
    if (id >= 0) result[id] = "__active";
    return result;
};
export default function Footer() {
    const [activeButtons, setActiveButtons] = useState(getActiveButtonsState(window.location.pathname));
    const history = useHistory();
    const onClickIcon = (event) => {
        const element = event.target.children[0] ? event.target : event.target.parentElement;
        const all = ["", "", "", ""];
        all[element.id] = "__active";
        const nav = (element.lastChild.lastChild.nodeValue).toLowerCase();
        setActiveButtons(all);
        history.push(`/${nav}`)

    };

    return (
        <div className="footer__container">
            <div className="footer">
                <div className="icon__container" id="0" onClick={onClickIcon}>
                    <img className="footer__icon" src={"./icons/footer/‏‏movies_icon" + activeButtons[0] + ".png"} alt="movies_icon" />
                    <div>Movies</div>
                </div>
                <div className="icon__container" id="1" onClick={onClickIcon}>
                    <img className="footer__icon" src={"./icons/footer/‏‏theaters_icon" + activeButtons[1] + ".png"} alt="theaters_icon" />
                    <div>Theaters</div>
                </div>
                <div className="icon__container" id="2" onClick={onClickIcon}>
                    <img className="footer__icon" src={"./icons/footer/news_icon" + activeButtons[2] + ".png"} alt="news_icon" />
                    <div>News</div>
                </div>
                <div className="icon__container" id="3" onClick={onClickIcon}>
                    <img className="footer__icon" src={"./icons/footer/account_icon" + activeButtons[3] + ".png"} alt="account_icon" />
                    <div>Account</div>
                </div>
            </div>

        </div>
    )
}
