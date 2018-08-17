// npm libs
import chroma from 'chroma-js';
import styled from 'react-emotion';
import { css } from 'emotion';

const TONES = [100, 200, 300, 400, 500, 600, 700];
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1024;

export const theme = {
  headerHeight: 70,
  maxWidthContainer: 767,

  mediaQueries: {
    mobile: {
      css: `@media screen and (max-width : ${TABLET_MIN_WIDTH - 1}px)`,
      js: `(max-width : ${TABLET_MIN_WIDTH}px)`,
    },
    tablet: {
      css: `@media (min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${DESKTOP_MIN_WIDTH - 1}px)`,
      js: `(max-width : ${TABLET_MIN_WIDTH}px)`,
    },
    desktop: {
      css: `@media (min-width: ${DESKTOP_MIN_WIDTH}px)`,
      js: `(max-width : ${TABLET_MIN_WIDTH}px)`,
    },
    join: mediaQueries => {
      return mediaQueries
        .map((mq, index) => {
          if (index === 0) return mq;
          return mq.replace('@media', ',');
        })
        .join('');
    },
  },

  spacing: {
    base: 10,
    xsmall: 5 / 2,
    small: 5,
    normal: 10,
    medium: 15,
    large: 20,
    xlarge: 30,
  },

  fontSize: {
    normal: '1em',
    xsmall: '0.6em',
    small: '0.8em',
    medium: '1.5em',
    large: '2em',
    xlarge: '3em',
  },

  shadow: {
    base: (color = '#CACACA') => `0 0 5px 0 ${color}`,
  },

  color: {
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

export const createStyles = fn => {
  return fn(theme);
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
    acum[curr] = css(styles[curr]); // eslint-disable-line
    return acum;
  }, {});
};

export const createPlainStylesObject = fn => fn(theme);
