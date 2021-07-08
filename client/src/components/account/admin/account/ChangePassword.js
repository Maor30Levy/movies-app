import React, { useState } from 'react'

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const setInput = [setPassword, setNewPassword, setReNewPassword];

    const onInputText = (event) => {
        const index = event.target.id;
        const value = event.target.value;
        setInput[index](value);
    }
    return (
        <div className="add-article">
            Enter Current Password: <input type="password" value={password} id={"0"} onInput={onInputText} />
            Enter New Password: <input type="password" value={newPassword} id={"1"} onInput={onInputText} />
            Re-Enter New Password: <input type="password" value={reNewPassword} id={"2"} onInput={onInputText} />
            <button>Change Pssword</button>
        </div>
    )
}
