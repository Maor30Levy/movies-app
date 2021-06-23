import React from 'react';

export const initialModalData = {
    isModal: false,
    children: null,
    back: []
};


const ModalReducer = (modalData, action) => {
    switch (action.type) {
        case "CLEAR":
            return {
                initialModalData
            };
        case "FORWARD":
            let result = [];
            let children;
            if (!!modalData.children) {
                children = {
                    elementName: modalData.children.elementName,
                    props: modalData.children.props
                };
                result = result.concat(!!modalData.back ? modalData.back : [], children);
            }
            return {
                ...modalData,
                isModal: true,
                back: result,
                children: action.children
            };
        case "BACK":
            let back = modalData.back;
            const cell = back.pop();
            return {
                ...modalData,
                children: cell,
                back
            };
        default:
            return { ...modalData };

    }
};


export default ModalReducer;