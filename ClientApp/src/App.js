import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Day from './components/Day';
import Event from './components/Event';
import EventAdd from './components/EventAdd';


class App extends Component {


    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={Home} />
                    <Route path="/day/:date" exact component={Day}/>
                    <Route path="/event/:id" component={Event} />
                    <Route path="/event-add" component={EventAdd} />
                </div>
            </Router>
        );
    }
}

export default App;


