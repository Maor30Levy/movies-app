import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext'
import { deleteAdmins, getAdminById, getAdmins } from '../../../../server/utils'
import AdjustItems from '../AdjustItems'
export default function DeleteAccount() {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    console.log(userData.activeUser)
    const onClickDelete = (items) => {
        const adminNames = items.map((item) => {
            const { name } = getAdminById(item);
            return name;
        })
        modalDataDispatch(goForwardAction({
            elementName: "ConfirmDelete",
            props: {
                onDeleteFunc: onClickSubmit,
                items: adminNames,
                onDeleteFuncData: items
            }
        }))
    };

    const onClickSubmit = (idArray) => {
        deleteAdmins(idArray)
    };

    const getAllAdminsExceptCurrent = () => {
        return getAdmins().filter(({ name }) => (name !== userData.activeUser));
    }
    return (
        <AdjustItems
            itemType={"Admin"}
            getItems={getAllAdminsExceptCurrent}
            getItemsParams={undefined}
            onSubmitFunc={onClickDelete}
            adjustType="Delete"
        />
    )
}
