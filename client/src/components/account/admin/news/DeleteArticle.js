import React, { useContext } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteArticles, getArticleByid, getArticles, getNews } from '../../../../server/utils'
import DeleteItems from '../DeleteItems'
export default function DeleteArticle() {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const onClickDelete = (items) => {
        const articlesNames = items.map((item) => {
            const { name } = getArticleByid(item, contentData.newsData);
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

    const onClickSubmit = async (articles) => {
        try {
            await deleteArticles(userData.token, articles)

            const newsData = await getArticles();
            contentDataDispatch(setDataAction({ newsData }))
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Articles deleted!" }
            }));
        } catch (err) {
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: err.response?.data.message || err.message }
            }));
        }

    };

    return (
        <DeleteItems
            getItems={getNews}
            getItemsParams={contentData.newsData}
            itemType="Articles"
            onSubmitFunc={onClickDelete}

        />
    )
}
