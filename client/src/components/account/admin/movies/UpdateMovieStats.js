import React, { useContext, useState } from 'react';
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { getData, getMovieByID, updateMovie } from '../../../../server/utils';

export default function UpdateMovieStats({ id }) {
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { name, description, picture } = getMovieByID(id, contentData.moviesData);
    const [newDescription, setNewDescription] = useState(description);
    const [newPicture, setNewPicture] = useState(picture);
    const setInputs = [setNewDescription, setNewPicture];
    const [errorMessage, setErrorMessage] = useState("");

    const onClickUpdate = async () => {
        setErrorMessage("");
        try {
            await updateMovie(userData.token, id, { description: newDescription, picture: newPicture });
            const moviesData = await getData("movies");
            contentDataDispatch(setDataAction({ moviesData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Movie updated!" }
            }));

        } catch (err) {
            setErrorMessage(err.response?.data.message || err.message);
        }
    };

    const onInputText = (event) => {
        setErrorMessage("");
        const value = event.target.value;
        const index = event.target.id;
        setInputs[index](value);
    }

    return (
        <div className="add-article">
            <h3>{name}</h3>
            Description:<textarea value={newDescription} onInput={onInputText} id="0" />
            Picture:<input value={newPicture} onInput={onInputText} id="1" />
            <button
                disabled={newDescription === ""}
                onClick={onClickUpdate}
            >Update</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}

        </div>
    )
}
