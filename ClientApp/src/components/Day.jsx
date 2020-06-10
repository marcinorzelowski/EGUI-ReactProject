import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import * as dateFns from 'date-fns'



class Day extends Component {
    state = { 
        day: this.getParamDate(),
        events: [],
        loaded: false,
        eventsFiltered: []
     }

    componentDidMount() {
        

        this.setState({
            day: this.getParamDate()
        })
        fetch("https://localhost:44346/api/event")
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        events: (result ? JSON.parse(result) : undefined),
                        loaded: true
                    })
                }
        );
    }



    getParamDate(){
        const parts = this.props.match.params.date.split('-');
        return new Date(parts[2], parts[1]-1, parts[0]); //dont know why js is counting months from 0 :O

    }

    renderRows() {
        
        let rows = [];
        if (this.state.eventsFiltered !== undefined) {
            this.state.eventsFiltered.forEach(ev => {
                rows.push(
                    <tr key={ev.id}>
                        <th scope="row">{ev.id}</th>
                        <td>{ev.name}</td>
                        <td>{ev.time}</td>
                        <td>
                            <Link to={'/event/' + ev.id}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>

                        </td>
                    </tr>
                )
            })
        }
        

        return rows;


    }

    


    render() { 
        if (this.state.events !== undefined) {
            this.state.events.forEach(d => {
                if (new Date(d.date).getTime() === new Date(this.state.day).getTime()) {
                    this.state.eventsFiltered.push(d);
                }

            })
        }

    return ( 
        <div className="p-3">
        <div className="card ">
            <div className="card-header "><h3>{dateFns.format(this.state.day,'dd-MM-yyyy')}</h3></div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Time</th>
                            <th scope="col">Option</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                </div>
                <Link to="/event-add">
                    <button className="btn btn-success addEv">Add event</button>
                </Link>
            </div>

            
        </div>
    );
    }
}


 
export default Day;