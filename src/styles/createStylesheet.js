// npm libs
import chroma from 'chroma-js';
import styled from 'react-emotion';
import { css } from 'emotion';

const FONT_SIZE_BASE = 18;
const TONES = [100, 200, 300, 400, 500, 600, 700];

export const theme = {

  headerHeight: 70,
  maxWidthContainer: 991,

  mediaQueries: {
    mobile: {
      css: '@media screen and (max-width : 767px)',
      js: '(max-width : 767px)',
    },
  },

  spacing: {
    base: 10,
    small: 5,
    normal: 10,
    medium: 15,
    large: 20,
    xlarge: 30,
  },

  fontSize: {
    normal: FONT_SIZE_BASE,
    xsmall: FONT_SIZE_BASE - 4,
    small: FONT_SIZE_BASE - 2,
    medium: FONT_SIZE_BASE + 2,
    large: FONT_SIZE_BASE + 4,
    xlarge: FONT_SIZE_BASE + 6,
  },

  fontWeight: {
    thin: 100,
    normal: 400,
    semibold: 500,
    bold: 700,
  },

  shadow: {
    base: (color = '#CACACA') => `0 0 5px 0 ${color}`,
  },

  color: {
    sample1: '#FFF',

    sample2: TONES.reduce((acum, current, index) => {
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
export const createStyledComponentWithProps = (tagName, fn) => {
  return styled(tagName)(fn);
};

export const createStylesheet = fn => {
  const styles = fn(theme);
  return Object.keys(styles).reduce((acum, curr) => {
    acum[curr] = css(styles[curr]);
    return acum;
  }, {});
};

export const createPlainStylesObject = fn => fn(theme);
