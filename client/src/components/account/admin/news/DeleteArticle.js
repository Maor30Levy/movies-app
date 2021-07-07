import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { deleteArticles, getArticleByid, getNews } from '../../../../server/utils'
import DeleteItems from '../DeleteItems'
export default function DeleteArticle() {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickDelete = (items) => {
        const articlesNames = items.map((item) => {
            const { name } = getArticleByid(item);
            return name;
        })
        modalDataDispatch(goForwardAction({
            elementName: "ConfirmDelete",
            props: {
                onDeleteFunc: onClickSubmit,
                items: articlesNames,
                onDeleteFuncData: items
            }
        }))
    };

    const onClickSubmit = (articles) => {
        deleteArticles(articles)
    };

    return (
        <DeleteItems
            getItems={getNews}
            getItemsParams={undefined}
            itemType="Articles"
            onSubmitFunc={onClickDelete}

        />
    )
}
