import React, { Component } from 'react';
import axios from 'axios'
import EditDay from './EditDay';

class ListLayout extends Component {

    render () {
        const { user,
        list, 
        removeUser,
        weekArray } = this.props
  
        return (
            <li className="list-group-item chore-list-item" key={user._id}>
                <p className="chore-name">{user.name}</p>
                <div className="row">
                    {weekArray.map((day) => {
                        return <EditDay 
                            day={day}
                            list={list}
                            key={day}
                            getLists={this.props.getLists}
                        />
                    })}
                </div>
                <button className="remove-chore btn btn-outline-warning btn-sm" onClick={() => removeUser(user._id, list._id)}>Remove</button>
            </li>
        )
    }

}

export default ListLayout