import React, { useState } from 'react';
import { getMovieByID, updateMovie } from '../../../../server/utils';

export default function UpdateMovieStats({ id }) {
    const { name, description } = getMovieByID(id);
    const [newDescription, setNewDescription] = useState(description);
    const onClickUpdate = () => {
        updateMovie(id, { description: newDescription })
    };

    const onInputText = (event) => {
        const value = event.target.value;
        setNewDescription(value)
    }

    return (
        <div>
            <h3>{name}</h3>
            Description:<textarea value={newDescription} onInput={onInputText} />
            <button
                disabled={newDescription === ""}
                onclick={onClickUpdate}
            >Update</button>
        </div>
    )
}
