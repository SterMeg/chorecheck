import React, { Component } from 'react';
import TaskToggle from './TaskToggle';
import axios from 'axios'

class SingleDay extends Component {
    state = {
        addCompletedClass: false
    }

    componentDidMount() {
        this.finishedAllChores()
    }

    finishedChore = async (isComplete, choreId) => {
        try {
            await axios.patch(`/lists/${this.props.list._id}/chores/${choreId}/${!isComplete}`)
        } catch(e) {
            console.log(e)
        }
        await this.props.getLists()
        this.finishedAllChores()
    }
    // finishedChore(firebaseKey, isComplete) {
    //     console.log('being called');
    //     if (isComplete === false) {
    //         firebase
    //             .database()
    //             .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.props.dayName}/${firebaseKey}`)
    //             .update({
    //                 complete: true
    //             });
    //     } else if (isComplete === true) {
    //         firebase
    //             .database()
    //             .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.props.dayName}/${firebaseKey}`)
    //             .update({
    //                 complete: false
    //             });
    //     }
    // }

    finishedAllChores() {
        let allComplete = this.props.list.chores.filter((chore) => {
            return chore.day === this.props.dayName
        }).map((chore) => {
            return chore.complete
        })
        const addCompletedClass = allComplete.every((chore) => {
            return chore === true;
        })
        if (addCompletedClass === true) {
            this.setState({
                addCompletedClass: true
            });
        } else {
            this.setState({
                addCompletedClass: false
            });
        }
    }


    render() {
        const completedClass = this.state.addCompletedClass === true ? "finished" : "";
        return (
            <div className={`single-day card ${completedClass}`}>
                <div className="card-header">{this.props.dayName}</div>
                <ul className="list-group list-group-flush">
                    {this.props.list.chores.filter((chore) => {
                        return chore.day === this.props.dayName
                    }).map((chore) => {
                        return (
                            <TaskToggle
                                key={chore._id}
                                chore={chore}
                                finishedChore={this.finishedChore}
                                completedClass={completedClass}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default SingleDay;