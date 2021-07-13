import React, { useContext, useState } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { addArticle, getArticles } from '../../../../server/utils';
import AddPicture from '../AddPicture';
export default function AddArticle() {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentDataDispatch } = useContext(DataContext);
    const [name, setName] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [article, setArticle] = useState('');
    const [picture, setPicture] = useState(null);
    const [pictureValue, setPictureValue] = useState(null);
    const setInput = [setName, setSubTitle, setArticle, setPictureValue];
    const [errorMessage, setErrorMessage] = useState('');
    const onInputText = (event) => {
        if (errorMessage !== "") setErrorMessage("")
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);
    };

    const onClickAdd = async () => {
        try {
            await addArticle(userData.token, { name, subTitle, article, picture });

            modalDataDispatch(clearModalAction());
            const newsData = await getArticles();
            contentDataDispatch(setDataAction({ newsData }))
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Article Added!" }
            }));
        } catch (err) {
            if (err.response) setErrorMessage(err.response.data.message);
            else setErrorMessage(err.message);
        }

    };
    return (
        <div className="add-article">
            Title:<input id="0" onInput={onInputText} />
            Sub-Title:<input id="1" onInput={onInputText} />
            Article:<textarea id="2" onInput={onInputText} />

            <AddPicture
                picture={picture}
                setPicture={setPicture}
                onInputText={onInputText}
                pictureValue={pictureValue}
                setPictureValue={setPictureValue}
            />
            <button
                disabled={!name || !subTitle || !article}
                onClick={onClickAdd}
            >
                Add Article</button>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
        </div>
    )
}
