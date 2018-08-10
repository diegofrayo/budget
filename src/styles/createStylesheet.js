// npm libs
import chroma from 'chroma-js';
import styled from 'react-emotion';
import { css } from 'emotion';

const tones = [100, 200, 300, 400, 500, 600, 700];

export const theme = {

  headerHeight: 50,

  spacing: {
    base: 10,
    small: 5,
    normal: 10,
    medium: 15,
    large: 20,
  },

  color: {
    sample1: '#FFF',

    sample2: tones.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('#555')
        .darken((index + 1) * 0.2)
        .hex();
      return acum;
    }, {}),
  },
};

export const createClassname = fn => {
  return css(fn(theme));
};

export const createStyledComponent = (tagName, fn) => {
  return styled(tagName)(fn(theme));
};

export const createStylesheet = fn => {
  const styles = fn(theme);
  return Object.keys(styles).reduce((acum, curr) => {
    acum[curr] = css(styles[curr]);
    return acum;
  }, {});
};

export const createPlainStylesObject = fn => fn(theme);
