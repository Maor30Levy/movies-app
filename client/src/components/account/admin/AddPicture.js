import React from 'react'

export default function AddPicture({
    picture, setPicture,
    onInputText, pictureValue, setPictureValue
}) {

    const onClickClear = (event) => {
        const PictureInputElement = event.target.parentElement.previousSibling.children[0];;
        PictureInputElement.value = "";
        setPicture(null);
        setPictureValue(null);
    }
    const onClickAddPicture = async (event) => {
        const pictureInput = event.target.previousSibling;
        const picture = pictureInput.value;
        setPicture(picture);


    }
    return (
        <div>
            Picture:
            <div>
                <input id="3" onInput={onInputText} />
                {!picture && <button onClick={onClickAddPicture} disabled={!pictureValue}>Add</button>}
            </div >
            {!!picture && <div className="image-preview__container">
                <img className="image-preview" src={picture} alt="article_picture" />
                <button onClick={onClickClear}>Clear</button>
            </div>}
        </div>
    )
}
