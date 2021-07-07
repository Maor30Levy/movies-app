import React, { useState } from 'react'
import { getArticleByid, updateArticle } from '../../../../server/utils'

export default function UpdateArticleStats({ id }) {
    const { name, subTitle, article, picture } = getArticleByid(id);
    const [nameValue, setNameValue] = useState(name);
    const [subTitleValue, setSubTitleValue] = useState(subTitle);
    const [articleValue, setArticleValue] = useState(article);
    const [pictureValue, setPictureValue] = useState(picture);
    const setInput = [setNameValue, setSubTitleValue, setArticleValue, setPictureValue];

    const onInputText = (event) => {
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);

    };

    const onClickUpdate = () => {
        updateArticle({
            id,
            name: nameValue,
            subTitle: subTitleValue,
            article: articleValue,
            picture: pictureValue
        })
    }

    return (
        <div className="add-article">
            Title:<input value={nameValue} id="0" onInput={onInputText} />
            Sub-Title:<textarea value={subTitleValue} id="1" onInput={onInputText} />
            Article:<textarea value={articleValue} id="2" onInput={onInputText} />
            Picture:<input value={pictureValue} id="3" onInput={onInputText} />
            <button onClick={onClickUpdate} disabled={!nameValue || !subTitleValue || !articleValue}>Update</button>
        </div>
    )
}
