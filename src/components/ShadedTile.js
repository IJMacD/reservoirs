import React from 'react';

import styles from '../styles/Tile.css';

export default (props) => {
    const { title, percent, height, shadeHeight, width, image, color } = props;
    
    const narrow = width < 100;
    const tileStyle = {
        height,
        background: color,
        width,
        margin: narrow ? '0 5px 50px' : 15,
        fontSize: narrow ? 10 : null
    };
    const realShadeHeight = shadeHeight || (tileStyle.height - 12) * (percent / 100);
    const shadeStyle = {
        backgroundImage: image ? `url(${image})` : null,
        height: realShadeHeight
    };
    const percentStyle = {
        transform: narrow ? "rotate(90deg) translate(-40px, -10px)" : null
    };
    const titleStyle = {
        top: narrow && "initial",
        bottom: narrow && -50
    };

    return (
        <li className={styles.tile} style={tileStyle}>
            <span className={styles.shade} style={shadeStyle}></span>
            <span className={styles.percent} style={percentStyle}>{percent}%</span>
            <span className={styles.name} style={titleStyle}>{title}</span>
        </li>
    );
}
