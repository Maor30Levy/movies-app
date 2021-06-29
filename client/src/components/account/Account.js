import React, { useContext, useEffect, useState } from 'react'
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import { UserContext } from '../../contexts/UserContext';
import Modal from '../main/Modal';
import AdminAccount from './admin/AdminAccount';
export default function Account() {
    const { userData } = useContext(UserContext);
    const { modalData, modalDataDispatch } = useContext(ModalContext);
    useEffect(() => {
        if (!userData.loggedIn)
            modalDataDispatch(goForwardAction({
                elementName: "LoginPage",
                props: {}
            }));
    }, [userData.loggedIn, modalDataDispatch])



    return (
        <div className="account__main">
            <div>
                <AdminAccount />

            </div>
            {(!userData.loggedIn && modalData.isModal) && <Modal />}
        </div>
    )
}
