// npm libs
import React from 'react';
import { Link } from 'react-router-dom';

// components
import MainMenu from 'components/layout/MainMenu';
import EmptyButton from 'components/common/EmptyButton';
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

    .main-menu-icon {
      color: white;
      font-size: ${theme.fontSize.xlarge};
      left: 20px;
      position: absolute;
      top: 20px;
    }

    .link {
      color: white;
    }

    .app-icon {
      font-size: ${theme.fontSize.large};
    }

    ${theme.mediaQueries.mobile.css} {
      min-height: ${theme.headerHeight - 20}px;

      .main-menu-icon {
        left: 10px;
        top: 10px;
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
    {(state, setState, props, events) => (
      <Container>
        <EmptyButton className="button" onClick={events.onClickOpenMenu(setState)}>
          <i className="material-icons main-menu-icon">menu</i>
        </EmptyButton>

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
