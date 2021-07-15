import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import ItemQueryContainer from './ItemQueryContainer';

export default function ItemSearch({ itemInput }) {
    const { contentData } = useContext(DataContext);

    return (
        <div className="item-serach__container">
            <ItemQueryContainer
                itemType={"Movies"}
                items={contentData.moviesData}
                itemInput={itemInput}
            />

            <ItemQueryContainer
                itemType={"News"}
                items={contentData.newsData}
                itemInput={itemInput}
            />
        </div>

    )
}
