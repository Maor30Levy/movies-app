import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import ItemSearch from './ItemSearch';
import { UserContext } from '../../contexts/UserContext';
import { logoutAction, setWindowAction } from '../../actions/UserActions';
import { logout } from '../../server/login';

export default function Header() {
    const { userData, userDataDispatch } = useContext(UserContext);
    const [isQuery, setIsQuery] = useState(false);
    const [onInput, setOnInput] = useState(false);
    const history = useHistory();

    useEffect(() => {
        userDataDispatch(setWindowAction(window.innerWidth));
    }, [userDataDispatch]);

    const onInputQuery = (event) => {
        const input = event.target.value;
        setIsQuery(input !== "" ? true : false)
    };

    const onClickCancel = (event) => {
        event.target.previousSibling.value = "";
        setIsQuery(false);
    };

    const onClickLogo = () => {
        history.push('/movies');
    };

    const onFocusInput = () => {
        setOnInput(true);
    };

    const onClickCancelQuery = (event) => {
        setOnInput(false);
        setIsQuery(false);
        const queryInput = event.target.previousSibling.children[0].children[1];
        queryInput.value = "";
    };

    const onClickLogout = async () => {
        try {
            await logout(userData.token, userData.isAdmin);
            userDataDispatch(logoutAction());
            history.push('/movies');
        } catch (err) {
            console.log(err)
        }

    };

    return (
        <div className="header__container">
            <div className="header">
                <img className="header__logo" src="./icons/header/logo.png" alt="logo" onClick={onClickLogo} />
                <div className="header__search_bar">
                    <div className="bar">
                        <img className="find-icon" src="./icons/header/find_icon.png" alt="find" />
                        <input placeholder="Movies and Shows"
                            onInput={onInputQuery}
                            onFocus={onFocusInput}
                        />
                        {isQuery && <div className="cancel-query" onClick={onClickCancel} ></div>}
                    </div>
                </div>
                {onInput && <div className="cancel-item-serach" onClick={onClickCancelQuery}>Cancel</div>}
                {!onInput && <div className="nav__bar">
                    <div className="nav__link"><NavLink to="/movies" className="a_nav" activeClassName="a_nav__active">Movies</NavLink></div>
                    <div className="nav__link"><NavLink to="/theaters" className="a_nav" activeClassName="a_nav__active">Theaters</NavLink></div>
                    <div className="nav__link"><NavLink to="/news" className="a_nav" activeClassName="a_nav__active">News</NavLink></div>
                    <NavLink className="account_logo" to="/account">                    <img src="./icons/header/‏‏account_icon__header.png" alt="account_logo" />
                    </NavLink>
                </div>}
            </div>
            {userData.loggedIn && <div className="logout" onClick={onClickLogout}>Logout</div>}
            {onInput && <ItemSearch />}
        </div>
    )
}
