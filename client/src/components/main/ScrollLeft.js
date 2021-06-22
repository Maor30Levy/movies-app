import React from 'react';


export default function ScrollRight({ scrollBy }) {

    const onClickScrollLeft = (event) => {
        const element = event.target.nextSibling ? event.target : event.target.parentElement;
        const container = element.nextSibling;
        container.scrollBy({ top: 0, left: -scrollBy, behavior: 'smooth' });
    };

    return (
        <div className="scroll-button" onClick={onClickScrollLeft}>
            <span className="scroll-button__left" />
        </div>
    )
}
