import React, { useContext } from 'react';
import { goForwardAction } from '../../../actions/ModalActions';
import { ModalContext } from '../../../contexts/ModalContext';

export default function Setting({ section, sections }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const sectionLower = section.toLowerCase();
    const onClickSetting = () => {
        const children = {
            elementName: "Menu",
            props: { sections }
        }
        modalDataDispatch(goForwardAction(children));
    };
    return (
        <div className="setting__container">
            <div className="icon_container">
                <div className="setting" onClick={onClickSetting}>
                    <img src={"./icons/account/settings__" + sectionLower + ".png"} alt="icon" />
                </div>
            </div>
            <div className="setting__title">{"Manage " + section}</div>
        </div>
    )
}
