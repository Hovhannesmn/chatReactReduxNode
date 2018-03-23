import { connect } from 'react-redux'
import Login from '../Component/Login'
import PropTypes from 'prop-types'
import request  from 'sync-request';

function mapStateToProps(state) {
    return state;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        signIn : (firstName, lastName) => {
            let res = request('GET', 'http://localhost:8888/logIn/' + firstName + '/' + lastName );
            let user = JSON.parse("[" + res.body + "]")[0];
            if (!user.length) {
                return false;
            }
            user[0].type = "SIGN_IN";
            return dispatch(user[0])
        }
    };
}


Login.propTypes = {
    signIn: PropTypes.func.isRequired
};

const LoginHOK = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
export default LoginHOK;
