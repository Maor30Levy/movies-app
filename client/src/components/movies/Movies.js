import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import ComingSoon from './ComingSoon'
import NowPlaying from './NowPlaying'
import Modal from '../main/Modal';
import { DataContext } from '../../contexts/DataContext';
import LoaderContainer from '../main/LoaderContainer';
import { setDataAction } from '../../actions/DataActions';
import { getAllData } from '../../server/utils';


export default function Movies() {
    const { modalData } = useContext(ModalContext);



    return (
        <div className="movies__container">
            <NowPlaying />
            <ComingSoon />
            {modalData.isModal && <Modal />}
        </div>

    )
}
