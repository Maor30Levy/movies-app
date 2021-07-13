import React from 'react'

export default function AddPicture({ picture, setPicture, setPictureValue }) {

    const onClickClear = (event) => {
        const PictureInputElement = event.target.parentElement.previousSibling.children[0];;
        PictureInputElement.value = "";
        setPicture(null);
        setPictureValue(null);
    }
    return (
        <div className="image-preview__container">
            <img className="image-preview" src={picture} alt="article_picture" />
            <button onClick={onClickClear}>Clear</button>
        </div>
    )
}
