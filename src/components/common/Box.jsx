/* eslint-disable camelcase */

// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// theme
import { createStylesheet, createClassname, theme as appTheme } from 'styles';

const getSizeValue = index => {
  if (index === 0) return index;
  return appTheme.spacing[index] || 0;
};

const createPaddingStyles = (p, ...rest) => {
  const values = {};
  if (typeof p === 'string') values.padding = p;
  if (typeof p === 'number') values.padding = getSizeValue(p);

  rest.reduce((acum, curr, index) => {
    let value = null;

    if (typeof curr === 'string') {
      value = curr;
    } else if (typeof curr === 'number') {
      value = getSizeValue(curr);
    }

    if (value !== null) {
      switch (index) {
        case 0:
          acum.paddingTop = value; // eslint-disable-line
          break;
        case 1:
          acum.paddingRight = value; // eslint-disable-line
          break;
        case 2:
          acum.paddingBottom = value; // eslint-disable-line
          break;
        default:
          acum.paddingLeft = value; // eslint-disable-line
          break;
      }
    }

    return acum;
  }, values);

  return values;
};

const createMarginStyles = (m, ...rest) => {
  const values = {};
  if (typeof m === 'string') values.margin = m;
  if (typeof m === 'number') values.margin = getSizeValue(m);

  rest.reduce((acum, curr, index) => {
    let value = null;

    if (typeof curr === 'string') {
      value = curr;
    } else if (typeof curr === 'number') {
      value = getSizeValue(curr);
    }

    if (value !== null) {
      switch (index) {
        case 0:
          acum.marginTop = value; // eslint-disable-line
          break;
        case 1:
          acum.marginRight = value; // eslint-disable-line
          break;
        case 2:
          acum.marginBottom = value; // eslint-disable-line
          break;
        default:
          acum.marginLeft = value; // eslint-disable-line
          break;
      }
    }

    return acum;
  }, values);

  return values;
};

const createWidthStyles = config => {
  if (typeof config === 'string' && config) return createClassname(() => ({ width: config }));

  if (Array.isArray(config) && config.length === 3) {
    return createClassname(
      theme => `
        ${theme.mediaQueries.mobile.css} {
          ${config[0] ? `min-width: ${config[0]}` : ''};
        }

        ${theme.mediaQueries.tablet.css} {
          ${config[1] ? `min-width: ${config[1]}` : ''};
        }

        ${theme.mediaQueries.desktop.css} {
          ${config[2] ? `min-width: ${config[2]}` : ''};
        }
      `
    );
  }

  return '';
};

const createAlignStyles = (alignValue, isRowDirection) => {
  if (isRowDirection) {
    return { justifyContent: alignValue };
  }

  return { alignItems: alignValue };
};

const classes = createStylesheet(() => ({
  box: 'display: flex; flex-shrink: 0;',
  column: 'flex-direction: column;',
  expand: 'flex: 1;',
  expand_x: 'width: 100%;',
  expand_y: 'height: 100%;',
  row: 'flex-direction: row; flex-wrap: wrap;',
  valign_column: 'justify-content: center;',
  valign_row: 'align-items: center;',
}));

const Box = props => {
  const {
    children,

    align,
    column,
    expand,
    'expand-x': expandX,
    'expand-y': expandY,
    row,
    valign,

    className,
    id,
    style,
    tag,
    onClick,

    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    w,
  } = props;

  const Tag = tag;
  const optionalProps = {};
  const alignStyle = createAlignStyles(align, row);
  const paddingStyle = createPaddingStyles(p, pt, pr, pb, pl);
  const marginStyle = createMarginStyles(m, mt, mr, mb, ml);
  const widthStyles = createWidthStyles(w);

  if (id) optionalProps.id = id;
  if (onClick) optionalProps.onClick = onClick;

  return (
    <Tag
      style={{ ...style, ...alignStyle, ...paddingStyle, ...marginStyle }}
      className={classnames(
        classes.box,
        column && classes.column,
        expand && classes.expand,
        expandX && classes.expand_x,
        expandY && classes.expand_y,
        row && classes.row,
        valign ? (column ? classes.valign_column : classes.valign_row) : '',
        widthStyles,
        className
      )}
      {...optionalProps}
    >
      {children && children.length ? React.Children.map(children, child => child) : children}
    </Tag>
  );
};

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),

  align: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'initial',
    'inherit',
  ]),
  column: PropTypes.bool,
  expand: PropTypes.bool,
  'expand-x': PropTypes.bool,
  'expand-y': PropTypes.bool,
  row: PropTypes.bool,
  valign: PropTypes.bool,

  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  tag: PropTypes.oneOf(['div', 'section', 'article', 'main', 'modal', 'header']),
  onClick: PropTypes.func,

  ...['m', 'mt', 'mr', 'mb', 'ml', 'p', 'pt', 'pr', 'pb', 'pl'].reduce((acum, key) => {
    // eslint-disable-next-line
    acum[key] = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
    return acum;
  }, {}),

  w: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

Box.defaultProps = {
  children: null,

  align: 'initial',
  column: false,
  expand: false,
  'expand-x': false,
  'expand-y': false,
  row: false,
  valign: false,

  id: '',
  className: '',
  style: {},
  tag: 'section',
  onClick: () => {},

  ...['m', 'mt', 'mr', 'mb', 'ml', 'p', 'pt', 'pr', 'pb', 'pl', 'w'].reduce((acum, key) => {
    // eslint-disable-next-line
    acum[key] = null;
    return acum;
  }, {}),
};

export default Box;
