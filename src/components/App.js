import React from 'react'

import ReservoirGridItem from './ReservoirGridItem';
import ReservoirBarItem from './ReservoirBarItem';
import styles from '../styles/App.css';

const RESERVOIR_URL = "/reservoirs.json";

export default class App extends React.Component {
  constructor () {
    super();
    
    this.state = {
      isLoading: true,
      reservoirs: [],
      layout: "grid"
    };

    this.loadData();
  }

  loadData () {
    this.setState({isLoading:true});
    fetch(RESERVOIR_URL)
      .then(result => result.json())
      .then(data => {
        this.setState({isLoading: false, reservoirs: data.reservoirs || []})
      });
  }

  flipLayout () {
    this.setState({layout: this.state.layout == "grid" ? "bar" : "grid"});
  }

  render () {
    const { isLoading, reservoirs, layout } = this.state;

    reservoirs.sort((a,b) => {
      const a_val = a.utilisation * a.capacity,
            b_val = b.utilisation * b.capacity;
      return a_val < b_val ? 1 : (a_val > b_val ? -1 : 0);
    });

    const LayoutItem = layout == "grid" ? ReservoirGridItem : ReservoirBarItem;
    const listStyle = {
      whiteSpace: layout == "grid" ? null : "nowrap"
    }; 

    return (
      <div>
        <h1 className={styles.heading}>
          Water Services Department Reservoir Status
          <button onClick={()=>this.flipLayout()} className={styles.btn}>{layout == "grid" ? "Bar" : "Grid"}</button>
          <button onClick={()=>this.loadData()} className={styles.btn}>Reload</button>
        </h1>
        { isLoading ? 
          <p className={styles.loading2}>Loading</p> :
          <ul className={styles.list} style={listStyle}>
          {
            reservoirs.map(reservoir => (
              <LayoutItem key={reservoir.name} reservoir={reservoir} />
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