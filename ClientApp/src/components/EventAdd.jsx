import React, { Component } from "react";
import * as dateFns from "date-fns";

class EventAdd extends Component {
    state = {
        name: "",
        time: "",
        date: "",
        loaded: false,
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }


    handleSubmit(event) {

        fetch("https://localhost:44346/api/event" ,{
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                time: this.state.time,
                date: this.state.date
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
        this.redirectoToMain();
    }

    onChangeName(event) {
        this.state.name = event.target.value;
    }
    onChangeDate(event) {
        this.state.date = event.target.value;
    }

    onChangeTime(event) {
        this.state.time = event.target.value;
    }

    redirectoToMain() {
        this.props.history.push('/');
    }

    render() {
 
        return (
            <div>
                <div className="card">
                    <div className="card-header"><h3>Event Creator</h3></div>
                    <div className="card-body"></div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                Name
              </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChangeName}
                        ></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                Time
              </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChangeTime}
                        ></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                Date
              </span>
                        </div>
                        <input
                            type="date"
                            className="form-control"
                            onChange={this.onChangeDate}
                        ></input>
                        <div className="input-group mb-3">
                            <button
                                className="btn btn-success mt-2"
                                onClick={this.handleSubmit}
                            >
                                Submit
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventAdd;
