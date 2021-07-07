import React from 'react';
import { getNews } from '../../../../server/utils';
import UpdateItem from '../UpdateItem';

export default function UpdateArticle() {
    return (
        <UpdateItem
            getItems={getNews}
            getItemsParams={undefined}
            itemType="Articles"
            elementName="UpdateArticleStats"
        />
    )
}
