import React, { Component } from 'react';
import Restaurants from './components/Restaurnats.js';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {name: '', password: '', email: '', phone: '', data: [] }
  }

  componentWillMount(e) {
    fetch('/api/restaurants/all')
      .then(res=> res.json())
      .then(data => this.setState({data}))
      .catch(err => console.error(err))

  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('/api/restaurants', (this.state))
    .then((response) => {
      this.setState({data: [...this.state.data, response.data]})
    })
    .catch((error) => {
      console.log(error);
    });
    return false;
  }

  onInputChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    return this.setState({[target]: value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form action="/api/restaurants" id="my-form" method="post" onSubmit={this.onSubmit.bind(this)}>
            <input type="text" name="name" onChange={this.onInputChange.bind(this)}/>
            <input type="text" name="location" onChange={this.onInputChange.bind(this)}/>
            <input type="text" name="email" onChange={this.onInputChange.bind(this)}/>
            <input type="text" name="password" onChange={this.onInputChange.bind(this)}/>
            <button>Hello</button>
          </form>
          </header>
          <Restaurants data={this.state.data} />
      </div>
    );
  }
}

export default App;
