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
                    element: modalData.children.type.name,
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
            let e, p;
            if (cell) {
                e = cell.element
                p = cell.props
            }
            const element = <e props={p} />;
            return {
                ...modalData,
                children: element,
                back
            };

        default:
            return { ...modalData };

    }
};


export default ModalReducer;