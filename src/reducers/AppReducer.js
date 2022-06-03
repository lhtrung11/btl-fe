export default function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER":
            return { ...action.payload };
        case "LOG_IN":
            return { ...action.payload };
        case "LOG_OUT":
            return { ...action.payload };
        default:
            return state;
    }
}
