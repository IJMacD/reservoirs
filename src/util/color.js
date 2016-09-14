
export function colorMix (start, end, x){
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

export function colorMixA (start, end, x){
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