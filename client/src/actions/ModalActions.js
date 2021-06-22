export const clearModalAction = () => ({
    type: "CLEAR"
});

export const goForwardAction = (children) => ({
    type: "FORWARD",
    children
});

export const goBackAction = () => ({
    type: "BACK"
});