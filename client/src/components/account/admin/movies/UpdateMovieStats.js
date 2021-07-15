import React, { useContext, useState } from 'react';
import { DataContext } from '../../../../contexts/DataContext';
import { getMovieByID, updateMovie } from '../../../../server/utils';

export default function UpdateMovieStats({ id }) {
    const { contentData } = useContext(DataContext);
    const { name, description } = getMovieByID(id, contentData.moviesData);
    const [newDescription, setNewDescription] = useState(description);
    const onClickUpdate = () => {
        updateMovie(id, { description: newDescription })
    };

    const onInputText = (event) => {
        const value = event.target.value;
        setNewDescription(value)
    }

    return (
        <div className="add-article">
            <h3>{name}</h3>
            Description:<textarea value={newDescription} onInput={onInputText} />
            <button
                disabled={newDescription === ""}
                onClick={onClickUpdate}
            >Update</button>
        </div>
    )
}
