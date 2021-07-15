import React, { useContext, useState } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { setDataAction } from '../../../../actions/DataActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { addMovie, getData, getMovieByName } from '../../../../server/utils';
import AddPicture from '../AddPicture';
export default function AddMovie() {

    const { modalDataDispatch } = useContext(ModalContext);
    const { userData } = useContext(UserContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState('');
    const [critics, setCritics] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const [pictureValue, setPictureValue] = useState(null);
    const setInput = [setName, setDescription, setCritics, setPictureValue];

    const onInputText = (event) => {
        setErrorMessage("");
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);
    };

    const onClickAddTimeSlots = async () => {
        setErrorMessage("");
        if (getMovieByName(name, contentData.moviesData)) {
            setErrorMessage("Movie already exists!");
        } else {
            try {
                const id = await addMovie({
                    name, description,
                    comments: [],
                    ratings: {
                        critics,
                        audience: NaN,
                        numOfRatings: 0
                    },
                    picture

                }, userData.token);
                const moviesData = await getData('movies');
                contentDataDispatch(setDataAction({ moviesData }));
                modalDataDispatch(goForwardAction({
                    elementName: "AddMovieTimeSlots",
                    props: { id }
                }))
            } catch (err) {
                if (err.response) setErrorMessage(err.response.data.message);
                else setErrorMessage(err.message);
            }

        }

    }


    return (
        <div className="add-movie">
            Name:<input id="0" onInput={onInputText} />
            Description:<input id="1" onInput={onInputText} />
            Critics: <input type="number" id="2" onInput={onInputText} />
            <AddPicture
                picture={picture}
                setPicture={setPicture}
                onInputText={onInputText}
                pictureValue={pictureValue}
                setPictureValue={setPictureValue}
            />
            <button
                disabled={!name || !critics || !description || critics <= 0 || critics > 1}
                onClick={onClickAddTimeSlots}
            >Add Time Slots</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}

        </div>
    )
}
