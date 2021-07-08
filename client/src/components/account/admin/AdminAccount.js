import React, { useContext } from 'react';
import Setting from './Setting';
import Modal from '../../main/Modal';
import { ModalContext } from '../../../contexts/ModalContext';
import { getMovies } from '../../../server/utils';
export default function AdminAccount() {
    const { modalData } = useContext(ModalContext);

    return (
        <div className="admin-account__container">
            <Setting
                section="Movies"
                sections={
                    [
                        {
                            title: "Add New Movie",
                            elementName: "AddMovie",
                            props: {}
                        },
                        {
                            title: "Update Movie",
                            elementName: "UpdateMovie",
                            props: {}
                        },
                        {
                            title: "Delete Movie",
                            elementName: "DeleteMovies",
                            props: {}
                        },
                    ]
                }
            />
            <Setting
                section="Theaters"
                sections={
                    [
                        {
                            title: "Add New Theater",
                            elementName: "AddTheater",
                            props: {}
                        },
                        {
                            title: "Update Theater",
                            elementName: "UpdateTheater",
                            props: {}
                        },
                        {
                            title: "Delete Theater",
                            elementName: "DeleteTheater",
                            props: {}
                        },
                        {
                            title: "Add New Location",
                            elementName: "AddLoction",
                            props: {}
                        },
                        {
                            title: "Delete Location",
                            elementName: "DeleteLocation",
                            props: {}
                        },
                    ]} />
            <Setting
                section="News"
                sections={
                    [
                        {
                            title: "Add New Article",
                            elementName: "AddArticle",
                            props: {}
                        },
                        {
                            title: "Update Article",
                            elementName: "UpdateArticle",
                            props: {}
                        },
                        {
                            title: "Delete Article",
                            elementName: "DeleteArticle",
                            props: {}
                        },
                    ]} />
            <Setting
                section="Account"
                sections={
                    [
                        {
                            title: "Change Password",
                            elementName: "ChangePassword",
                            props: {}
                        },
                        {
                            title: "Add New Admin Account",
                            elementName: "AddAccount",
                            props: {}
                        },
                        {
                            title: "Delete Admin Account",
                            elementName: "DeleteAccount",
                            props: {}
                        }
                    ]} />
            {modalData.isModal && <Modal />}
        </div>
    )
}
