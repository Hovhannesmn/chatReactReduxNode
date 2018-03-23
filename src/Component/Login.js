import React from 'react'

let firstName;
let lastName;
export default class Login extends React.Component{
    handleChangeFirstName(event) {
        firstName = event.target.value;
    }

    handleChangeLastName(event) {
        lastName = event.target.value;
    }

    render() {
        const { isLogout, /*messages,  sendMessage,*/ signIn } = this.props;
        const loginForm =
                    <div className='ui one column centered grid'>
                        <div className='ten wide column'>
                            <div
                                className='ui raised very padded text container segment'
                                style={{ textAlign: 'center' }}
                            >
                                <h2 className='ui green header'>
                                    Login form
                                </h2>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    if (!firstName || !lastName) {
                                        return
                                    }
                                    return signIn(firstName, lastName);

                                }}>

                                    <input  value={firstName} onChange={this.handleChangeFirstName} />

                                    <br />
                                    <br />
                                    <br />

                                    <input type="text" value={lastName} onChange={this.handleChangeLastName} />
                                    <br />
                                    <input type='submit' />
                                </form>
                            </div>
                        </div>
                    </div>

        return  (
            <div>
                { //Check if message failed
                    (isLogout)
                        ? loginForm
                        : loginForm
                }
            </div>
        )
    }
}