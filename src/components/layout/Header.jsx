// npm libs
import React from 'react';
import { Link } from 'react-router-dom';

// routing
import { routes } from 'routing';

// theme
import { createPlainStylesObject } from 'styles/createStylesheet';

const styles = createPlainStylesObject(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: 'gray',
    color: 'white',
    display: 'flex',
    flex: 0,
    minHeight: theme.headerHeight,
    padding: `0 ${theme.spacing.medium}px`,
  },
  menuItem: {
    display: 'inline-block',
    margin: `0 ${theme.spacing.base}px`,
  },
}));

const Header = () => (
  <header style={styles.container}>
    Header
    <nav>
      <ul>
        <li style={styles.menuItem}>
          <Link to={routes.HOME}>Home</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to={routes.ABOUT}>About</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
