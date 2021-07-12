import React, { useContext } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteAdmins, getAdminsData } from '../../../../server/utils';
import AdjustItems from '../AdjustItems'
export default function DeleteAccount() {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);

    const getAdminById = (adminID) => {
        return contentData.adminsData.filter(({ id }) => (id === adminID))[0];
    }
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

    const onClickSubmit = async (idArray) => {
        await deleteAdmins(idArray, userData.token);
        const admins = await getAdminsData(userData.token);
        contentDataDispatch(setDataAction(admins));
        modalDataDispatch(clearModalAction());
        modalDataDispatch(goForwardAction({
            elementName: "ApprovalMessage",
            props: { message: "Accounts successfully deleted!" }
        }));
    };

    const getAllAdminsExceptCurrent = () => {
        return contentData.adminsData.filter(({ name }) => (name !== userData.activeUser));
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
