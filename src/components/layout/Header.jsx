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

    .main-menu-icon{
      color: white;
      cursor: pointer;
      font-size: 28px;
      left: 20px;
      position: absolute;
      top: 22px;
    }

    .link {
      color: white;
    }

    .app-icon {
      font-size: 2em;
    }

    ${theme.mediaQueries.mobile.css} {
      min-height: ${theme.headerHeight - 20};

      .app-icon {
        font-size: 1.5em;
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
        <i
          className="material-icons main-menu-icon"
          role="button"
          tabIndex="0"
          onClick={events.onClickOpenMenu(setState)}
        >
          menu
        </i>
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
