// theme
import { createStyledComponent, createStyledComponentWithProps } from 'styles';

const TabsContainer = createStyledComponent(
  'section',
  theme => `
    box-shadow: ${theme.shadow.base('gray')};
    overflow: hidden;
    width: 100%;
  `
);

const TabsHeader = createStyledComponent(
  'section',
  () => `
    background-color: #4c5661;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    overflow-x: auto;
  `
);

const Tab = createStyledComponentWithProps(
  'section',
  ({ theme, selected }) => `
    color: white;
    cursor: pointer;
    flex: 1;
    font-size: ${theme.fontSize[2]};
    padding ${theme.spacing[2]} ${theme.spacing[1]};
    text-align: center;
    text-transform: uppercase;

    ${
      selected
        ? `
          background-color: #637180;
          font-weight: bold;
          text-decoration: underline;
      `
        : ''
    }
  `
);

const PanesContainer = createStyledComponent('section', () => ``);

const Pane = createStyledComponentWithProps(
  'section',
  ({ show }) => `
    display: ${show ? 'block' : 'none'};
    max-width: 100%;
    overflow: auto;
    width: 100%;
  `
);

export { TabsContainer, TabsHeader, Tab, PanesContainer, Pane };
