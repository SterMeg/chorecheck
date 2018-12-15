import React, { Component } from 'react';
import axios from 'axios'
import ListLayout from './ListLayout'

class EditList extends Component {
    state = {
        weekArray: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        user: '',
        lists: []
    }

    componentDidMount () {
        this.getLists()
    }

    clearInput = () => {
        this.setState({ user: '' })
    }

    addUser = async e => {
        e.preventDefault()
        try {
            await axios
            .post('/users', {
                user: this.state.user
            }).then(res=> {
                const addedUser = res.data.data[0]
                this.generateList(addedUser)
            })
        } catch (e) {
            console.log(e)
        }
        this.clearInput()
    }


    generateList = async (user) => {

        try {
            await axios.post('/lists', { user
            })
            this.getLists()
        } catch (e) {
            console.log(e)
        }
    }

    getLists = async () => {
        try {
            const response = await axios.get('/lists')

            const lists = response.data.data
            this.setState({ lists })
        } catch (e) {
            console.log(e)
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    removeUser = async (userId, listId) => {
        try {
            await axios.delete(`/users/${userId}`)
            await axios.delete(`/lists/${listId}`)
            this.getLists()
        } catch (e) {
            console.log(e)
        }
    }
    
    render() {
        const { lists, user, weekArray } = this.state
        return (
            // <div className="row">
                <React.Fragment>
                    <input type="text" className="form-control" name="user" placeholder="Add user" onChange={this.handleChange} value={user} />
                    <button className="btn btn-outline-warning btn-sm"  onClick={this.addUser}>Add User</button>
                    {lists.length > 0 &&
                    <div className="row">
                        {lists.map((list) => {
                            return (
                                <ListLayout
                                    user={list.user}
                                    list={list}
                                    removeUser={this.removeUser}
                                    key={list._id}
                                    weekArray={weekArray}
                                    getLists={this.getLists}
                                />
                            )
                        })}
                    </div>
                    }
                </React.Fragment>
            // </div>
        )
    }
}

export default EditList;