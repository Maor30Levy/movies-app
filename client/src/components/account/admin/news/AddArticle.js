import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react'
import { clearModalAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { addArticle } from '../../../../server/utils';

export default function AddArticle() {
    const { modalDataDispatch } = useContext(ModalContext);
    const [name, setName] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [article, setArticle] = useState('');
    const setInput = [setName, setSubTitle, setArticle];
    const onInputText = (event) => {
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);
    };

    const onClickAdd = () => {
        addArticle({
            id: nanoid(),
            name, subTitle, article,
            picture: ""
        })

        modalDataDispatch(clearModalAction());
    };
    return (
        <div className="add-article">
            Title:<input id="0" onInput={onInputText} />
            Sub-Title:<input id="1" onInput={onInputText} />
            Article:<textarea id="2" onInput={onInputText} />
            Picture:<input type="file" />
            <button
                disabled={!name || !subTitle || !article}
                onClick={onClickAdd}
            >
                Add Article</button>
        </div>
    )
}
