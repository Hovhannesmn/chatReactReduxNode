import React, { Component } from 'react';

import '../App.css';
import axios from 'axios';
import request  from 'sync-request';
// import { WebsocketView } from 'react-websocket-view';
import {Link} from 'react-router-dom'


let firstName;
let lastName;
class Chat extends Component {
    getMessage(user, messages) {
        if (messages === undefined || messages.length  === 0) return false;

        return messages.reverse().map((element, key) => {
            if (element.userId === user.userId) {
                return (
                    <li key={key} className="self">
                    <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false" alt="self"/></div>
                    <div className="msg">
                        <p>{user.firstName}</p>
                        <p>{element.text}</p>
                        <time>TIME IS A 24:00</time>
                    </div>
                </li>
                )
            } else {
                return (
                    <li key={key} className="other">
                        <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false" alt="other"/></div>
                        <div className="msg">
                            <p>{element.userName}</p>
                            <p>{element.text}</p>
                            <time>18:07</time>
                        </div>
                    </li>
                )
            }

        });
    }

    handleChangeFirstName(event) {
         firstName = event.target.value;
    }

    handleChangeLastName(event) {
        lastName = event.target.value;
    }

    getLocalState(state) {
        if (state.isLogout) {
            return state;
        }

        let res = request('GET', 'http://localhost:8888/message/');
        let messageLis = JSON.parse("[" + res.body + "]")[0];
        if (state.messages[0] !== undefined) {
            axios.post('http://localhost:8888/message', {
                    userId: state.user.userId,
                    userName: state.user.firstName,
                    text: state.messages[0].text
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(function (response) {
                axios.get('http://localhost:8888/message/')
                    .then(result => console.log(result.data))
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            return Object.assign({}, state,
                {
                    messages: messageLis,
                } );


        }

        let newMessage = {
            userId: state.user.userId,
            text: state.messages[0].text
        };

        messageLis.unshift(newMessage);
        return Object.assign({}, state, {messages : messageLis});
    }

render() {
    const { isLogout, user, messages } = this.getLocalState(this.props.messages);
    const { signIn, reloadPage, sendMessage } = this.getLocalState(this.props);

    let input;
    const loginForm =
        <div>
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
                                alert('fill all fields');
                                return
                            }

                            let res = request('GET', 'http://localhost:8888/logIn/' + firstName + '/' + lastName );
                            let user = JSON.parse("[" + res.body + "]")[0];

                            if (!user.length) {
                                alert('wrong user');
                                return false;
                            }
                            return signIn(user[0]);
                        }}>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="firstName">FirstName</label>
                                    <input id="firstName" className="form-control" value={(user || {}).firstName} onChange={this.handleChangeFirstName}
                                           placeholder="First Name"/>
                                </div>
                                <div className="form-group col-md-4">
                                </div>
                            </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="lastName">LastName</label>
                                        <input type="text" id="lastName" className="form-control" value={lastName} onChange={this.handleChangeLastName}
                                               placeholder="Last Name" />
                                    </div>
                                    <div className="form-group col-md-4">
                                    </div>
                                </div>
                            <br/>
                            <input type='submit' className="form" />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    const chatForm =
                <div>
                    <div className="menu">
                        <div className="back"><i className="fa fa-chevron-left"></i>
                            <img src="https://i.imgur.com/DY6gND0.png" draggable="false" alt="back"/></div>
                        <div className="name">{(user || {}).firstName}</div>
                        <div className="last">18:09</div>
                    </div>
                {reloadPage()}
                    <ol className="chat">
                        <div className="day">Hoy</div>
                        {this.getMessage(user, messages)}
                    </ol>
                    <input
                        ref={node => {
                            input = node
                        }}
                        className="textarea" type="text" placeholder="Type here!"/>
                    <div className="emojis"></div>
                    <button onClick=
                                {e => {
                                    e.preventDefault();
                                    if (!input.value.trim()) {
                                        return
                                    }
                                    let imp = input.value;
                                    input.value = '';
                                    return sendMessage(imp);
                                }}

                            className="send-button">
                        send
                    </button>
                </div>
                return (
                    <div>
                        <Link className='ui item' to='/login'>
                            Logout
                        </Link>
                        { //Check if has login
                            (isLogout)
                                ? loginForm
                                : chatForm
                        }
                    </div>
        )
    }
}

export default Chat;