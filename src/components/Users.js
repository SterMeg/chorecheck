import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        user: '',
        users: []
    }

    componentDidMount() {
        this.getUsers()
    }

    clearInput = () => {
        this.setState({ user: ''})
    }

    getUsers = async () => {
        try {
            const response = await axios.get('/users')

            const users = response.data.data
            this.setState({users})
        } catch(e) {
            console.log(e)
        }
    }

    // handleSubmit(e) {
    //     e.preventDefault();


    //     const user = {
    //         value: this.state.user,
    //     };

    //     this.setState({
    //         user: '',
    //         index: updateIndex
    //     });

    // }


    addUser = async e => {
        e.preventDefault()
        try {
            await axios.post('/users', {
                user: this.state.user
            })
            this.getUsers()
        } catch (e) {
            console.log(e)
        }
        this.clearInput()
    }


    removeUser = async id => {
        try {
            await axios.delete(`/users/${id}`)
            this.getUsers()
        } catch(e) {
            console.log(e)
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { users, user } = this.state
        return (
            <React.Fragment>
                <h2 className="text-center mb-5">Users</h2>
                <input type="text" className="form-control" name="user" placeholder="Add user" onChange={this.handleChange} value={user} />
                <button className="btn btn-outline-warning btn-sm"  onClick={this.addUser}>Add User</button>
                <ul className="list-group">
                    {users.map((user) => {
                        return (
                            <li className="list-group-item chore-list-item" key={user._id}>
                                <p className="chore-name">{user.name}</p>
                                <button className="remove-chore btn btn-outline-warning btn-sm" onClick={() => this.removeUser(user._id)}>Remove</button>
                            </li>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

export default Users;