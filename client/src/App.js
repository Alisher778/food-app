import React, { Component } from "react";
// import Restaurants from "./components/Restaurnats.js";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      phone: "",
      admin_name: "",
      admin_phone: "",
      admin_email: "",
      admin_lang: "",
      admin_avatar: "",
      data: []
    };
  }

  componentDidMount(e) {
    fetch("/api/restaurants/all")
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err.message));
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    axios
      .post("/api/restaurants", this.state)
      .then(response => {
        this.setState({ data: [...this.state.data, response.data] });
      })
      .catch(error => {
        console.log(error);
      });
    return false;
  }

  onDelete(e) {
    axios
      .get(`/api/restaurants/delete/${e.target.id}`)
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(error => console.log(error));
  }

  onUpdate(e) {
    e.preventDefault();
    axios
      .post(`/api/restaurants/edit/${e.target.id}`, this.state)
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(error => console.log(error));
    return false;
  }

  onInputChange(e) {
    const target = e.target.name;
    const value = e.target.value;

    return this.setState({ [target]: value });
  }

  showEdite() {}

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <form
            action="/api/restaurants"
            id="my-form"
            method="post"
            onSubmit={this.onSubmit.bind(this)}
          > 
            <input type="text" name="name" onChange={this.onInputChange.bind(this)}/>
            <input type="text" name="name" onChange={this.onInputChange.bind(this)}/>
            <button>Hello</button>
          </form>
        </header>
        <h1>Restaurants</h1>
        <ul>
          {this.state.data.map((item, i) => {
            return (
              <li key={i}>
                {item.name}{" "}
                <button id={item._id} onClick={this.onDelete.bind(this)}>
                  Remove
                </button>
                  <form
                    id={item._id}
                    onSubmit={this.onUpdate.bind(this)}
                  >
                    <input
                      type="text"
                      name="name"
                      onChange={this.onInputChange.bind(this)}
                      defaultValue={item.name}
                    />
                    <input
                      type="text"
                      name="email"
                      onChange={this.onInputChange.bind(this)}
                      defaultValue={item.email}
                    />
                      <button>Update</button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
