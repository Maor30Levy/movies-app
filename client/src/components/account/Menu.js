import React, { useContext } from 'react'
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import { nanoid } from 'nanoid';

export default function Menu({ sections }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickOption = (event) => {

        const { elementName, props } = sections[event.target.id];
        const children = {
            elementName,
            props
        }
        modalDataDispatch(goForwardAction(children));
    };

    return (
        <div className="menu__container">
            {sections.length > 0 && sections.map(({ title }, i) => (
                <button key={nanoid()} onClick={onClickOption} id={i}>{title}</button>
            ))}
        </div>
    )
}
