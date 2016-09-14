import React from 'react';

import ShadedTile from './ShadedTile';

import { colorMix } from '../util/color';

export default (props) => {
    const { reservoir } = props;
    const logCapacity = Math.log(reservoir.capacity);
    const logContent = Math.log(reservoir.capacity *  reservoir.utilisation);
    const colorShade = colorMix([255,32,32],[32,192,48],reservoir.utilisation);
    const verticalScale = 25;
    const height = logCapacity * verticalScale;
    const shadeHeight = logContent * verticalScale - 12;
    const width = 64;
    const percent = reservoir.utilisation * 100;

    return (
        <ShadedTile
          title={reservoir.name}
          percent={percent}
          height={height}
          shadeHeight={shadeHeight}
          width={width}
          color={colorShade}
          image={reservoir.image} />
    );
}
