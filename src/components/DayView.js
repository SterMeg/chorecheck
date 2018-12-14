import React, { Component } from 'react';
import moment from 'moment';
// import SingleDay from './SingleDay';

class DayView extends Component {
    state = {
        dayName: '',
        currWeek: ''
    }

    componentDidMount() {
        moment().format();
        const currDate = new Date;
        const currDay = currDate.getDay();
        const currWeek = moment(currDate).week();

        const dayName = this.props.weekArray[currDay];

        this.setState({
            dayName: dayName,
            currWeek: currWeek
        });
    }

  
    // componentDidUpdate() {
    //     if (this.props.userArray.length > 0 && this.state.currWeek % 2 === 0) {
    //         const reverseArray = Array.from(this.props.userArray).reverse();
    //         console.log(reverseArray);
    //     }
    // }


    render() {
        if (!this.props.users) {
            return <div>Loading...</div>
        }
        return (
            <React.Fragment>
                <h2 className="text-center mb-5">Today's Chores</h2>
                {/* <button className="btn btn-outline-secondary"onClick={() => this.props.switchList()}>Swap Chores</button>
                <p>Chores lists will remain swapped until clicked again</p> */}
                <div className="row">
                    {this.props.users.map((user) => {
                        return (
                            <div key={user._id} className="col-sm-6">
                                <h4 className="mb-3">{user.name}</h4>
                                {/* <SingleDay
                                    userArray={this.props.userArray}
                                    weekArray={this.props.weekArray}
                                    list={i}
                                    dayName={this.state.dayName} /> */}

                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default DayView;