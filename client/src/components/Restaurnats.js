import React, { Component } from 'react';

class Restaurants extends Component {

  render() {
    const resName = this.props.data.map((item ,i) =>{
      return <li key={i}>{item.name}, {item.email}</li>
    });
    return(
      <div>
        <h1>Restaurants</h1>
        <ul>
          {resName}
        </ul>
      </div>
    );
  }
}

export default Restaurants;
