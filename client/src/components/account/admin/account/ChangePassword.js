import React, { useContext, useState } from 'react'
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { changePassword } from '../../../../server/utils';

export default function ChangePassword() {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [inputClasses, setInputClasses] = useState(["", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", ""]);
    const [validInputs, setValidInputs] = useState([false, false]);
    const isFormInvalid = () => {
        return currentPassword === "" || validInputs.includes(false);
    };

    const setStateOfInputs = (message, inputClass, isvalidInput, inputindex) => {
        const newInavlidMessages = [...invalidMessages];
        const newInputClasses = [...inputClasses];
        const newValidInputs = [...validInputs];
        newInavlidMessages[inputindex] = message;
        setInvalidMessages(newInavlidMessages);
        newInputClasses[inputindex] = inputClass;
        setInputClasses(newInputClasses);
        newValidInputs[inputindex] = isvalidInput;
        setValidInputs(newValidInputs);
    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {


        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true, inputindex);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false, inputindex);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false, inputindex);
        }
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return passwordRegex.test(value);
        };
        validateInput(
            newPassword,
            0,
            isPasswordValid,
            setNewPassword,
            "You must enter a new password",
            "Password must contain capital and regular characters, numbers and must have at least 8 characters"
        );
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = () => {
            return newPassword === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            1,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your new password",
            "The two passwords not identical"
        );
    };

    const onInputCurrentPassword = (event) => {
        const value = event.target.value.trim();
        setCurrentPassword(value);
    }

    const onClickChange = async () => {
        setErrorMessage("");
        try {
            await changePassword(userData.token, { currentPassword, newPassword }, true);
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Password successfully updated!" }
            }));
        } catch (err) {
            setErrorMessage(err.response?.statusText);
        }
    }
    return (
        <div className="add-article">
            Enter Current Password: <input type="password" id={"0"} onInput={onInputCurrentPassword} />
            Enter New Password: <input type="password" id={"1"} onBlur={onBlurPassword} />
            {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
            Re-Enter New Password: <input type="password" id={"2"} onBlur={onBlurPasswordRepeated} />
            {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
            <button onClick={onClickChange} disabled={isFormInvalid()}>Change Password</button>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
        </div>
    )
}
