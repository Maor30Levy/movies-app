import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ItemSearch from './ItemSearch';

export default function Header() {
    const [isQuery, setIsQuery] = useState(false);
    const [onInput, setOnInput] = useState(false);
    const history = useHistory();

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

    const onClickCancelQuery = () => {
        setOnInput(false);
    }

    return (
        <div className="header__container">
            <div className="header">
                <img className="header__logo" src="./icons/logo.png" alt="logo" onClick={onClickLogo} />
                <div className="header__search_bar">
                    <div className="bar">
                        <img className="find-icon" src="./icons/find_icon.png" alt="find" />
                        <input placeholder="Movies and Shows"
                            onInput={onInputQuery}
                            onFocus={onFocusInput}
                        />
                        {isQuery && <div className="cancel-query" onClick={onClickCancel} ></div>}
                    </div>
                </div>
                {onInput && <div className="cancel-item-serach" onClick={onClickCancelQuery}>Cancel</div>}
            </div>
            {onInput && <ItemSearch />}
        </div>
    )
}
