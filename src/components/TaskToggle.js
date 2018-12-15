import React from 'react';

const TaskToggle = (props) => {
    const completeChore = props.chore.complete === true ? "fa-check-square" : "fa-square";
    return (
        <li onClick={() => props.finishedChore(props.chore.complete , props.chore._id)} className={`${props.completedClass} list-group-item chore-list-item`}>
            <p className="chore-name">{props.chore.chore}</p>
            <div>
                <i className={`fa ${completeChore}`}></i>
            </div>
        </li>
    )
}

export default TaskToggle;