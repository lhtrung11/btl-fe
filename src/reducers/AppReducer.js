export default function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER":
            return { ...action.payload };
        case "LOG_IN":
            return { ...action.payload };
        case "LOG_OUT":
            return { ...action.payload };
        case "GET_ALL_ACCOUNTS":
            return { ...state, accounts: action.payload};
        default:
            return state;
    }
}
