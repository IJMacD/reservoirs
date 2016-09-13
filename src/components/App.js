import React from 'react'

const RESERVOIR_URL = "/reservoirs.json";

export default class App extends React.Component {
  constructor () {
    super();
    
    this.state = {
      reservoirs: []
    };

    fetch(RESERVOIR_URL)
      .then(result => result.json())
      .then(data => {
        this.setState({reservoirs: data.reservoirs})
      });
  }

  render () {
    const { reservoirs } = this.state;

    return (
      <div>
        <ul>
        {
          reservoirs.map(reservoir => (
            <li key={reservoir.name}>{reservoir.name} {reservoir.utilisation * 100}%</li>
          ))
        }
        </ul>
      </div>
    )
  }
}