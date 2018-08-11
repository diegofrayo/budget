// npm libs
import React from 'react';
import { Link } from 'react-router-dom';

// components
import MainMenu from 'components/layout/MainMenu';
import ReactComponent from 'lib/Component';

// routing
import { routes } from 'routing';

// theme
import { createStyledComponent } from 'styles/createStylesheet';

const Container = createStyledComponent(
  'header',
  theme => `
    align-items: center;
    background-color: #2196f3;
    box-shadow: ${theme.shadow.base('gray')};
    display: flex;
    flex: 0;
    justify-content: center;
    min-height: ${theme.headerHeight}px;
    padding: 0 ${theme.spacing.medium}px;
    z-index: 100;

    .button {
      cursor: pointer;
      background-color: transparent;
      border: 0;
      outline: 0;
    }

    .main-menu-icon {
      color: white;
      font-size: ${theme.fontSize.xlarge * 1.5}px;
      left: 20px;
      position: absolute;
      top: 18px;
    }

    .link {
      color: white;
    }

    .app-icon {
      font-size: ${theme.fontSize.xlarge * 1.5}px;
    }

    ${theme.mediaQueries.mobile.css} {
      min-height: ${theme.headerHeight - 20}px;

      .material-icons {
        font-size: ${theme.fontSize.xlarge}px;
      }

      .main-menu-icon {
        left: 10px;
        top: 14px;
      }
    }
  `
);

const Header = () => (
  <ReactComponent
    state={{ isMenuOpen: false }}
    events={{
      onClickOpenMenu: setState => () => {
        setState(state => ({
          isMenuOpen: !state.isMenuOpen,
        }));
      },
    }}
  >
    {(state, setState, events) => (
      <Container>
        <button className="button" onClick={events.onClickOpenMenu(setState)}>
          <i className="material-icons main-menu-icon">menu</i>
        </button>

        <Link to={routes.HOME} className="link">
          <i className="material-icons app-icon">monetization_on</i>
        </Link>

        <MainMenu
          isMenuOpen={state.isMenuOpen}
          onClickOpenMenu={events.onClickOpenMenu(setState)}
        />
      </Container>
    )}
  </ReactComponent>
);

export default Header;
