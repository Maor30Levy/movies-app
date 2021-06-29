import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import ComingSoon from './ComingSoon'
import NowPlaying from './NowPlaying'
import Modal from '../main/Modal';


export default function Movies() {
    const { modalData } = useContext(ModalContext);

    return (
        <div className="movies__container">
            <NowPlaying />
            <ComingSoon />
            <NowPlaying />
            <ComingSoon />
            {modalData.isModal && <Modal />}
        </div>
    )
}
