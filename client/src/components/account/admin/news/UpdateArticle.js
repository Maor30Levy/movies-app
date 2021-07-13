import React, { useContext } from 'react';
import { DataContext } from '../../../../contexts/DataContext';
import { getNews } from '../../../../server/utils';
import UpdateItem from '../UpdateItem';

export default function UpdateArticle() {
    const { contentData } = useContext(DataContext);
    return (
        <UpdateItem
            getItems={getNews}
            getItemsParams={contentData.newsData}
            itemType="Articles"
            elementName="UpdateArticleStats"
        />
    )
}
