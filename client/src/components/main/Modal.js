import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { clearModalAction, goBackAction } from '../../actions/ModalActions';
import ShowMovieDetails from '../theaters/ShowMovieDetails';
import Seats from '../theaters/Seats';
import Reservation from '../theaters/Reservation';
import Default from '../main/Default';
import AddComment from '../movies/AddComment';
import Movie from '../movies/Movie';
import LoginPage from '../login/LoginPage';
import Menu from '../account/Menu';
import UpdateMovie from '../account/admin/movies/UpdateMovie';
import UpdateTheater from '../account/admin/theaters/UpdateTheater';
import UpdateItem from '../account/admin/UpdateItem';
import UpdateTheaterStats from '../account/admin/theaters/UpdateTheaterStats';
import UpdateAvailableTimeSlots from '../account/admin/theaters/UpdateAvailableTimeSlots';
import AddLoction from '../account/admin/theaters/AddLoction';
import AddTheater from '../account/admin/theaters/AddTheater';
import AddNewTheaterStats from '../account/admin/theaters/AddNewTheaterStats';
import DeleteLocation from '../account/admin/theaters/DeleteLocation';
import ConfirmDelete from '../account/admin/ConfirmDelete';
import DeleteTheater from '../account/admin/theaters/DeleteTheater';
import DeleteTheaters from '../account/admin/theaters/DeleteTheaters';
import AddArticle from '../account/admin/news/AddArticle';
import UpdateArticle from '../account/admin/news/UpdateArticle';
import UpdateArticleStats from '../account/admin/news/UpdateArticleStats';
import DeleteArticle from '../account/admin/news/DeleteArticle';
import AddMovie from '../account/admin/movies/AddMovie';
import DeleteMovies from '../account/admin/movies/DeleteMovies';
import AddMovieTimeSlots from '../account/admin/movies/AddMovieTimeSlots';
import ChangePassword from '../account/admin/account/ChangePassword';
import AddAccount from '../account/admin/account/AddAccount';
import DeleteAccount from '../account/admin/account/DeleteAccount';
import AdjustItems from '../account/admin/AdjustItems';
import AddTimeSlots from '../account/admin/movies/AddTimeSlots';
import UpdateMovieStats from '../account/admin/movies/UpdateMovieStats';
export default function Modal() {
    const { modalData, modalDataDispatch } = useContext(ModalContext);
    const components = {
        Default, LoginPage,
        ShowMovieDetails, Seats, Reservation,
        AddComment, Movie,
        Menu, UpdateMovie, AddMovie, DeleteMovies, AddMovieTimeSlots, AddTimeSlots,
        UpdateMovieStats,
        ConfirmDelete, UpdateItem, AdjustItems,
        UpdateTheater, UpdateTheaterStats, UpdateAvailableTimeSlots, AddLoction,
        AddTheater, AddNewTheaterStats, DeleteLocation, DeleteTheater, DeleteTheaters,


        AddArticle, UpdateArticle, UpdateArticleStats, DeleteArticle,

        ChangePassword, AddAccount, DeleteAccount
    };
    const [children, setChildren] = useState({ elementName: 'Default', props: {} });
    useEffect(() => {
        setChildren(modalData.children);

    }, [modalData.children])
    const onClickCloseModal = () => {
        modalDataDispatch(clearModalAction());
    };
    const onClickGoBack = (event) => {
        modalDataDispatch(goBackAction());
        event.stopPropagation();
    };
    return (
        <div className="modal__container">
            <div className="modal">
                <div className="modal__header">
                    {modalData.back?.length > 0 && <div className="modal__back" onClick={onClickGoBack}>Back</div>}
                    <div className="close-modal__container" onClick={onClickCloseModal}>
                        <div className="close-modal" ></div>
                    </div>
                </div>
                <div className="modal__content">{React.createElement(components[children.elementName], children.props)}</div>
            </div>
        </div>
    )
}
