import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios'
import SingleDay from './SingleDay';

class DayView extends Component {
    state = {
        dayName: '',
        currWeek: '',
        lists: [],
        weekArray: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }

    componentDidMount() {
        moment().format();
        const currDate = new Date();
        const currDay = currDate.getDay();
        const currWeek = moment(currDate).week();

        const dayName = this.state.weekArray[currDay];

        this.setState({
            dayName: dayName,
            currWeek: currWeek
        });
        this.getLists()
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
  
    // componentDidUpdate() {
    //     if (this.props.userArray.length > 0 && this.state.currWeek % 2 === 0) {
    //         const reverseArray = Array.from(this.props.userArray).reverse();
    //         console.log(reverseArray);
    //     }
    // }


    render() {
        const { lists } = this.state
        if (this.state.lists.length < 1) {
            return <div>Add some chores!</div>
        }
        return (
            <React.Fragment>
                <h2 className="text-center mb-5">Today's Chores</h2>
                {/* <button className="btn btn-outline-secondary"onClick={() => this.props.switchList()}>Swap Chores</button>
                <p>Chores lists will remain swapped until clicked again</p> */}
                <div className="row">
                    {lists.map((list) => {
                        return (
                            <div key={list.user._id} className="col-sm-6">
                                <h4 className="mb-3">{list.user.name}</h4>
                                <SingleDay
                                    weekArray={this.state.weekArray}
                                    list={list}
                                    getLists={this.getLists}
                                    dayName={this.state.dayName} />

                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default DayView;