import React, { Component } from 'react';


import * as dateFns from 'date-fns'
import { Link } from 'react-router-dom';


class Home extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        loaded: false,
        events: []
    }

    componentDidMount() {
        fetch("https://localhost:44346/api/event")
            .then(res => res.text()    
            )
            .then(
                (result) => {
                    this.setState({
                        events: (result ? JSON.parse(result) : undefined),
                        loaded: true
                    })
                }
            );
    }
    onDateClick = day => {

    }
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    renderHeader() {
        const dateFormat = "MMMM yyyy"

        return (
            <div className="calendarHeader">
                <div>
                    <button className="btn btn-primary" onClick={this.prevMonth}>Previous Month</button>
                </div>
                <div>
                    <span className="dateHeaderSpan">
                        <h3>{dateFns.format(this.state.currentMonth, dateFormat)}</h3>
                    </span>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.nextMonth}>Next Month</button>
                </div>
            </div>
        )
    }
    renderDays() {
        const dateFormat = "ccc";
        const days = [];
        let startDate = dateFns.addDays(dateFns.startOfWeek(this.state.currentMonth), 1); //change display to EU
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col cell weekDays" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }
    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.addDays(dateFns.endOfWeek(monthEnd), 1);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = dateFns.addDays(startDate, 1);

        
        let formattedDate = "dddd";


        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                let dayClass = "day ";

                if (this.checkDate(day) === true ) {

                    dayClass += "active";
                }
                days.push(
                    <div
                        className={`col cell ` + dayClass}
                        key={day}
                        onClick={() => this.onDateClick(cloneDay)}
                    >
                        <Link to={'/day/' + dateFns.format(day, "dd-MM-yyyy")}>
                        <span className={'day'}>{formattedDate}</span>
                        </Link>

                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }


    checkDate(day) {
        let ret = false;
        if (this.state.events !== undefined) {
            this.state.events.forEach(d => {
                if (new Date(d.date).getTime() === new Date(day).getTime()) {

                    ret = true;
                }

            })
        }
        
        return ret;
    }

    render() {
        return (
            <div>

                <div className="calendar card">
                    <div className="card-header">
                        {this.renderHeader()}
                    </div>
                    <div className="card-body">
                        {this.renderDays()}
                        {this.renderCells()}
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;