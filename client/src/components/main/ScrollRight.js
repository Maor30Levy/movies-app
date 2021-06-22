import React from 'react';


export default function ScrollRight({ scrollBy }) {
    const onClickScrollRight = (event) => {
        const element = event.target.previousSibling ? event.target : event.target.parentElement;
        const container = element.previousSibling;
        container.scrollBy({ top: 0, left: scrollBy, behavior: 'smooth' });
    };
    return (
        <div className="scroll-button" onClick={onClickScrollRight}>
            <span className="scroll-button__right" />
        </div>
    )
}
