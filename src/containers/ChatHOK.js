import { connect } from 'react-redux'
import Chat from '../Component/Chat'
import PropTypes from 'prop-types'


const emptyMessage = {
    type: 'SEND_MESSAGE',
    userId: 1,
    text: '',
    completed : false
};

// Map Redux state to component props
function mapStateToProps(state) {
    return state;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (obj) => {
            let message = Object.assign({}, emptyMessage, {text: obj});
                return dispatch(message);
        },

        signIn : (user) => {
            user.type = "SIGN_IN";
            return dispatch(user)
        },

        reloadPage : () => {
            return setTimeout(() => {
                dispatch({
                    type: "RELOAD_PAGE"
                });
            }, 5000);
        }
    };
}

Chat.propTypes = {
    sendMessage : PropTypes.func.isRequired,
    signIn      : PropTypes.func.isRequired,
    reloadPage  : PropTypes.func.isRequired
};

const ChatHOK = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);

export default ChatHOK;
