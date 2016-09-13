import React from 'react'

import ReservoirTile from './ReservoirTile';
import styles from '../styles/App.css';

const RESERVOIR_URL = "/reservoirs.json";

export default class App extends React.Component {
  constructor () {
    super();
    
    this.state = {
      isLoading: true,
      reservoirs: []
    };

    fetch(RESERVOIR_URL)
      .then(result => result.json())
      .then(data => {
        this.setState({isLoading: false, reservoirs: data.reservoirs || []})
      });
  }

  render () {
    const { isLoading, reservoirs } = this.state;

    reservoirs.sort((a,b) => {
      const a_val = a.utilisation * a.capacity,
            b_val = b.utilisation * b.capacity;
      return a_val < b_val ? 1 : (a_val > b_val ? -1 : 0);
    });

    return (
      <div>
        { isLoading ? 
          <p className={styles.error}>Loading</p> :
          <ul className={styles.list}>
          {
            reservoirs.map(reservoir => (
              <ReservoirTile key={reservoir.name} reservoir={reservoir} />
            ))
          }
          { reservoirs.length == 0 &&
            <li className={styles.error}>That's strange but there seem to be no reservoirs</li>
          }
          </ul>
        }
      </div>
    )
  }
}