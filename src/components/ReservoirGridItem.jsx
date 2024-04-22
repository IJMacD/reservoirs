import React from 'react';

import ShadedTile from './ShadedTile';

import { colorMix } from '../util/color';

export default (props) => {
    const { reservoir } = props;
    const logCapacity = Math.log(reservoir.capacity);
    const colorShade = colorMix([255,32,32],[32,192,48],reservoir.utilisation);
    const height = logCapacity * 10;
    const width = 150;
    const percent = reservoir.utilisation * 100;

    return (
        <ShadedTile
          title={reservoir.name}
          percent={percent}
          height={height}
          width={width}
          color={colorShade}
          image={reservoir.image} />
    );
}
