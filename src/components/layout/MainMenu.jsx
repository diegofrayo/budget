// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// routing
import { goTo, routes } from 'routing';

// session
import { getUserSession, signOut } from 'services/auth';

// theme
import { createStyledComponentWithProps } from 'styles';

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

    .menu {
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .menu-header {
      background-color: #eee;
      box-shadow: ${theme.shadow.base('gray')};
      color: black;
      cursor: default;
      font-size: ${theme.fontSize[4]};
      margin-bottom: ${theme.spacing[0]};
      padding: ${theme.spacing[1]} ${theme.spacing[1]};
      text-align: center;
    }

    .icon {
      margin-right: ${theme.spacing[0]};
    }

    .menu-item {
      color: black;
      cursor: pointer;
      background-color: transparent;
      border: 0;
      font-size: ${theme.fontSize[2]};
      outline: 0;
      padding: ${theme.spacing[2]} ${theme.spacing[3]};
      text-align: left;
      width: 100%;
    }
  `
);

const onClickMenuItem = (onClickOpenMenu, route) => () => {
  goTo(route);
  onClickOpenMenu();
};

const MENU_ITEMS = [
  {
    name: 'Home',
    route: routes.HOME,
  },
  {
    name: 'Summary',
    route: routes.SUMMARY,
  },
  {
    name: 'Sign In',
    route: routes.SIGN_IN,
  },
  {
    name: 'Sign Out',
    onClick: onClickOpenMenu => () => {
      onClickOpenMenu();
      signOut();
    },
  },
];

const MainMenu = ({ onClickOpenMenu, isMenuOpen }) => {
  const userSession = getUserSession();
  const menuItems = userSession.isGuest
    ? MENU_ITEMS.filter((item, index) => index !== 3)
    : MENU_ITEMS.filter((item, index) => index !== 2);

  return [
    <Backdrop key="backdrop" onClick={onClickOpenMenu} visible={isMenuOpen === true}>
      {''}
    </Backdrop>,
    <MenuContainer key="menu-container" visible={isMenuOpen === true}>
      <ul className="menu">
        <li className="menu-header">
          <i className="material-icons icon">person</i>
          <span>
            Hello <strong>{getUserSession().username}</strong>
          </span>
        </li>
        {menuItems.map(item => (
          <li key={`menu-item-${item.route}`}>
            <button
              className="menu-item"
              onClick={
                (item.onClick && item.onClick(onClickOpenMenu)) ||
                onClickMenuItem(onClickOpenMenu, item.route)
              }
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </MenuContainer>,
  ];
};

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onClickOpenMenu: PropTypes.func.isRequired,
};

export default MainMenu;
