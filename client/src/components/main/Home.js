import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setDataAction } from '../../actions/DataActions';
import { DataContext } from '../../contexts/DataContext';
import { getAllData } from '../../server/utils';
import LoaderContainer from './LoaderContainer';

export default function Home() {
    const { contentDataDispatch } = useContext(DataContext);
    const [componentOn, setComponentOn] = useState(false);
    const history = useHistory();
    useEffect(() => {
        setComponentOn(true);
        if (componentOn) getAllData().then((res) => {
            contentDataDispatch(setDataAction(res))
            history.push('/movies');
        }).catch((err) => {
            console.log(err)
        });
        return () => {
            setComponentOn(false);
        }
    }, [contentDataDispatch, componentOn]);
    return (
        <LoaderContainer />
    )
}
