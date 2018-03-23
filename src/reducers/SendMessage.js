const defaultStateValue = {
    messages : [],
    isLogout : true,
    user : {}
};

function sendMessage(state = defaultStateValue, action) {
    switch (action.type) {
        case "SIGN_IN":
            let user = {
                firstName: action.firstName,
                lastName: action.lastName,
                userId : action._id
            };
            return Object.assign({}, state, {isLogout: !state.isLogout, user : user});
        case "SEND_MESSAGE" :
            return Object.assign({}, state, {
                messages: [action],
                user: {...state.user}
            },);
        case "RELOAD_PAGE" :
            return Object.assign({}, state, {
                messages: [],
                user: {...state.user}
            } );
        default : return state;
    }
}

export default sendMessage;