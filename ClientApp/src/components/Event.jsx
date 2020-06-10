import React, { Component } from "react";
import * as dateFns from "date-fns";

class Event extends Component {
    state = {
        event: [],
        loaded: false,
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        fetch("https://localhost:44346/api/event/" + this.props.match.params.id)
            .then((res) => res.json())
            .then((result) => {

                this.setState({
                    event: result,
                    loaded: true
                });
            });
    }

    handleSubmit(event) {
      

        fetch("https://localhost:44346/api/event/" + this.state.event.id, {
            method: "PUT",
            body: JSON.stringify({
                id: this.state.event.id,
                name: this.state.event.name,
                time: this.state.event.time,
                date: this.state.event.date,
            }),
            headers: {
                "Content-Type": "application/json",
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
        this.state.event.name = event.target.value;
    }
    onChangeDate(event) {
        this.state.event.date = event.target.value;
    }

    onChangeTime(event) {
        this.state.event.time = event.target.value;
    }

    onDelete(event) {
        fetch("https://localhost:44346/api/event/" + this.state.event.id, {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
        this.redirectoToMain();
    }

    redirectoToMain() {
        this.props.history.push('/');
    }

    render() {
        if (this.state.loaded === false) {
            return <h3>Loading...</h3>;
        }
        return (
            <div>
                <div className="card">
                    <div className="card-header"><h3>Event Editor</h3></div>
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
                            defaultValue={this.state.event.name}
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
                            defaultValue={this.state.event.time}
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
                            defaultValue={this.state.event.date.substr(0, 10)}
                            onChange={this.onChangeDate}
                        ></input>
                     </div>
                    <div className="input-group mb-3">
                        <div>
                            <button
                                className="btn btn-success"
                                onClick={this.handleSubmit}
                            >
                                Submit
              </button>
                            <button className="btn btn-danger" onClick={this.onDelete}>
                                Delete
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Event;
