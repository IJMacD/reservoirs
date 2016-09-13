import React from 'react';

import styles from '../styles/Tile.css';

export default (props) => {
    const { reservoir } = props;
    const logCapacity = Math.log(reservoir.capacity);
    const colorShade = colorMix([200,32,0],[32,128,32],reservoir.utilisation);
    const tileStyle = {
        height: logCapacity * 10,
        background: colorShade,
    };
    const percent = `${reservoir.utilisation * 100}%`;
    const shadeStyle = {
        backgroundImage: reservoir.image ? `url(${reservoir.image})` : null,
        height: (tileStyle.height - 12) * reservoir.utilisation
    };
    const percentStyle = {};

    return (
        <li className={styles.tile} style={tileStyle}>
            <span className={styles.shade} style={shadeStyle}></span>
            <span className={styles.percent} style={percentStyle}>{percent}</span>
            <span className={styles.name}>{reservoir.name}</span>
        </li>
    );
}

function colorMix(start, end, x){
  return {
    0: start[0] + (end[0] - start[0]) * x,
    1: start[1] + (end[1] - start[1]) * x,
    2: start[2] + (end[2] - start[2]) * x,
    toString: function() {
        return `rgb(
            ${this[0].toFixed()},
            ${this[1].toFixed()},
            ${this[2].toFixed()})`
    }
  }
}

function colorMixA(start, end, x){
  return {
    0: start[0] + (end[0] - start[0]) * x,
    1: start[1] + (end[1] - start[1]) * x,
    2: start[2] + (end[2] - start[2]) * x,
    3: start[3] + (end[3] - start[3]) * x,
    toString: function() {
        return `rgba(
            ${this[0].toFixed()},
            ${this[1].toFixed()},
            ${this[2].toFixed()},
            ${this[3]})`
    }
  }
}