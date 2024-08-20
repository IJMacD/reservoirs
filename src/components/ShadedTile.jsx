import React from 'react';

import styles from '../styles/Tile.module.css';

export default (props) => {
    const { title, percent, height, shadeHeight, width, image, color } = props;

    const narrow = width < 100;

    /** @type {import('react').CSSProperties} */
    const tileStyle = {
        height,
        background: color,
        width,
        margin: narrow ? '0 5px 50px' : 15,
        fontSize: narrow ? 10 : undefined
    };

    const realShadeHeight = shadeHeight || (tileStyle.height - 12) * (percent / 100);

    /** @type {import('react').CSSProperties} */
    const shadeStyle = {
        backgroundImage: image ? `url(${cdnImage(image, narrow ? 600 : 300)})` : undefined,
        height: realShadeHeight
    };

    /** @type {import('react').CSSProperties} */
    const percentStyle = {
        transform: narrow ? "rotate(90deg) translate(-40px, -10px)" : undefined
    };

    /** @type {import('react').CSSProperties} */
    const titleStyle = {
        top: narrow ? "initial" : undefined,
        bottom: narrow ? -50 : undefined,
    };

    return (
        <li className={styles.tile} style={tileStyle}>
            <span className={styles.shade} style={shadeStyle}></span>
            <span className={styles.percent} style={percentStyle}>{percent.toFixed(0)}%</span>
            <span className={styles.name} style={titleStyle}>{title}</span>
        </li>
    );
}

/**
 * @param {string} url
 */
function cdnImage(url, width = 300) {
    const zone = "ijmacd.com";

    return `https://${zone}/cdn-cgi/image/width=${width}/${url}`;
}