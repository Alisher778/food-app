import React, { Component } from 'react';

class Restaurants extends Component {

  render() {
    return(
      <div>
        <h1>Restaurants</h1>
        <ul>
          {this.props.data.map((item ,i) =>{
            return <li key={i}>{item.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Restaurants;
