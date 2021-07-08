import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { addMovie, getMovieByName } from '../../../../server/utils';

export default function AddMovie() {
    const { modalDataDispatch } = useContext(ModalContext);
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState('');
    const [critics, setCritics] = useState('');
    const [description, setDescription] = useState('');
    const setInput = [setName, setCritics, setDescription];

    const onInputText = (event) => {
        setErrorMessage("");
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);
    };

    const onClickAddTimeSlots = () => {
        setErrorMessage("");
        if (getMovieByName(name)) {
            setErrorMessage("Movie already exists!");
        } else {
            const id = nanoid();
            addMovie({
                id, name, description,
                comments: [],
                ratings: {
                    critics,
                    audience: NaN,
                    numOfRatings: 0
                }
            })
            modalDataDispatch(goForwardAction({
                elementName: "AddMovieTimeSlots",
                props: { id }
            }))
        }

    }


    return (
        <div className="add-movie">
            Name:<input id="0" onInput={onInputText} />
            Description:<input id="1" onInput={onInputText} />
            Critics: <input type="number" id="2" onInput={onInputText} />
            <button
                disabled={!name || !critics || !description}
                onClick={onClickAddTimeSlots}
            >Add Time Slots</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}

        </div>
    )
}
