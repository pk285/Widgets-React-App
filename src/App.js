import React, { Component } from 'react';
import ExampleComponent from "react-rounded-image";
import ReactDOM from 'react-dom';
import {Route, withRouter} from 'react-router-dom';

class App extends Component {

  state = {
    users: [],
    cities: [],
    selectedCity: "",
    validationError: ""
  }
 

  componentDidMount() {
    fetch("http://challenge-dev.starmarkcloud.com/users")
      .then((response) => {
        return response.json();
      })
      .then(data3 => {
        let citiesFromApi = data3.map(city => { return {value: city, display: city} })
        this.setState({ cities: [{value: '', display: '(FILTER BY CITY)'}].concat(citiesFromApi) });
      }).catch(error => {
        console.log(error);
      });
  }


  componentDidMount() {
    fetch('http://challenge-dev.starmarkcloud.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data })
      console.log(this.state.users)
    })
    .catch(console.log)
  }

  render() {
    return (
        <div className="container-fluid">
        <div className="col-md-6">
        <h1>Page Title</h1>
        <hr></hr>

        <div>
          <select value={this.state.selectedCity} 
                  onChange={(e) => this.setState({selectedCity: e.target.value, validationError: e.target.value === "" ? "You must select a city" : ""})}>
            {this.state.cities.map((city) => <option key={city.value} value={city.value}>{city.display}</option>)}
          </select>
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationError}
          </div>
        </div>

        {this.state.users.map((user) => (
          <div className="card">
          <div className="row">
          <div class="col-md-6">
              {/* Avatar needs to be circle, got the "roundedCircle" from */}
              <ExampleComponent
                image={user.avatar}
                roundedColor=""
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
              />
            </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">Name: {user.firstName + " " + user.lastName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Phone: {user.phone}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Email: {user.email}</h6>
              <h6 className="card-subtitle mb-2 text-muted">City: {user.address.city}</h6>
            </div>
            </div>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
}

export default App;