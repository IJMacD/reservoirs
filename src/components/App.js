import React from 'react'

import ReservoirGridItem from './ReservoirGridItem';
import ReservoirBarItem from './ReservoirBarItem';
import styles from '../styles/App.css';

const RESERVOIR_URL = process.env.REACT_APP_API_ROOT;

export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      isLoading: true,
      error: null,
      reservoirs: [],
      layout: "grid"
    };
  }

  componentDidMount () {
    this.loadData();
  }

  loadData () {
    this.setState({isLoading:true});
    fetch(RESERVOIR_URL)
      .then(result => result.json())
      .then(data => {
        this.setState({ reservoirs: data.reservoirs || [] })
      },
      () => {
        this.setState({ error: "Unable to load reservoirs" })
      })
      .then(() => this.setState({ isLoading: false }));
  }

  flipLayout () {
    this.setState({layout: this.state.layout == "grid" ? "bar" : "grid"});
  }

  render () {
    const { isLoading, reservoirs, layout, error } = this.state;

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
            (
              error ?
                <p>{error}</p>
                :
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
            )
        }
      </div>
    )
  }
}