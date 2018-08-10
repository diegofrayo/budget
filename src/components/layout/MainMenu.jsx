// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// routing
import { goTo, routes } from 'routing';

// theme
import { createStyledComponentWithProps } from 'styles/createStylesheet';

const Backdrop = createStyledComponentWithProps(
  'div',
  ({ visible }) => `
    background-color: rgba(0, 0, 0, 0.5);
    display: ${visible ? 'block' : 'none'};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `
);

const MenuContainer = createStyledComponentWithProps(
  'section',
  ({ theme, visible }) => `
    background-color: white;
    bottom: 0;
    box-shadow: ${theme.shadow.base('black')};
    display: ;
    left: 0;
    max-width: 280px;
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    transform: ${visible ? 'translateX(0)' : `translateX(-${theme.maxWidthContainer}px)`};
    transition: all 0.3s linear;
    will-change: transform;
    z-index: 200;

    .menu{
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .menu-header{
      border-bottom: ${`1px solid gray`};
      color: black;
      cursor: default;
      font-size: ${theme.fontSize.xlarge}px;
      font-weight: ${theme.fontWeight.bold};
      margin-bottom: ${theme.spacing.base}px;
      padding: ${`${theme.spacing.large}px ${theme.spacing.base}px`};
      text-align: center;
    }

    .icon{
      margin-right: ${theme.spacing.base};
    }

    .menu-item{
      color: black;
      cursor: pointer;
      font-size: ${theme.fontSize.small};
      font-weight: ${theme.fontWeight.normal};
      padding: ${`${theme.spacing.medium}px ${theme.spacing.large}px`};
    }
  `
);

const onClickMenuItem = (onClickOpenMenu, route) => () => {
  goTo(route);
  onClickOpenMenu();
};

const menuItems = [
  {
    name: 'Home',
    route: routes.HOME,
  },
  {
    name: 'Summary',
    route: routes.SUMMARY,
  },
];

const MainMenu = props => [
  <Backdrop key="backdrop" onClick={props.onClickOpenMenu} visible={props.isMenuOpen === true}>
    {''}
  </Backdrop>,
  <MenuContainer key="menu-container" visible={props.isMenuOpen === true}>
    <ul className="menu">
      <li className="menu-header">
        <i className="material-icons icon">monetization_on</i>
        <span>budget</span>
      </li>
      {menuItems.map(item => (
        <li
          key={`menu-item-${item.route}`}
          className="menu-item"
          onClick={onClickMenuItem(props.onClickOpenMenu, item.route)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  </MenuContainer>,
];

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onClickOpenMenu: PropTypes.func.isRequired,
};

export default MainMenu;
