import React, { useContext, useState } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { getArticleByid, getArticles, updateArticle } from '../../../../server/utils'

export default function UpdateArticleStats({ id }) {
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { name, subTitle, article, picture } = getArticleByid(id, contentData.newsData);
    const [nameValue, setNameValue] = useState(name);
    const [subTitleValue, setSubTitleValue] = useState(subTitle);
    const [articleValue, setArticleValue] = useState(article);
    const [pictureValue, setPictureValue] = useState(picture || "");
    const setInput = [setNameValue, setSubTitleValue, setArticleValue, setPictureValue];
    const [errorMessage, setErrorMessage] = useState('');

    const onInputText = (event) => {
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);

    };

    const onClickUpdate = async () => {
        try {
            setErrorMessage("")
            await updateArticle(id, {
                name: nameValue,
                subTitle: subTitleValue,
                article: articleValue,
                picture: pictureValue
            }, userData.token);
            const newsData = await getArticles();
            contentDataDispatch(setDataAction({ newsData }))
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Article Added!" }
            }));
        } catch (err) {
            setErrorMessage(err.message)
        }

    }

    return (
        <div className="add-article">
            Title:<input value={nameValue} id="0" onInput={onInputText} />
            Sub-Title:<textarea value={subTitleValue} id="1" onInput={onInputText} />
            Article:<textarea value={articleValue} id="2" onInput={onInputText} />
            Picture:<input value={pictureValue} id="3" onInput={onInputText} />
            <button onClick={onClickUpdate} disabled={!nameValue || !subTitleValue || !articleValue}>Update</button>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
        </div>
    )
}
