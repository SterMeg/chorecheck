import React, { Component } from 'react';
import EditDay from './EditDay';

class ListLayout extends Component {

    render () {
        const { user,
        list, 
        removeUser,
        weekArray } = this.props
  
        return (
            <div className="col-md-6" key={user._id}>
                <h4 className="text-center mb-5 chore-name">{user.name}</h4>
                    {weekArray.map((day) => {
                        return <EditDay 
                            day={day}
                            list={list}
                            key={day}
                            getLists={this.props.getLists}
                        />
                    })}
                <button className="remove-chore btn btn-outline-warning btn-sm" onClick={() => removeUser(user._id, list._id)}>Remove</button>
            </div>
        )
    }

}

export default ListLayout