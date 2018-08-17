// theme
import { createStyledComponent, createStyledComponentWithProps } from 'styles/createStylesheet';

const TabsContainer = createStyledComponent(
  'section',
  theme => `
    border-radius: 10px 0 10px 0;
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
    font-size: ${theme.fontSize.normal};
    padding ${theme.spacing.medium}px ${theme.spacing.base}px;
    text-align: center;
    text-transform: uppercase;

    ${
      selected
        ? `
    background-color: #637180;
    font-weight: bold;
      `
        : ''
    }
  `
);

const PanesContainer = createStyledComponent('section', () => ``);

const Pane = createStyledComponentWithProps(
  'section',
  ({ theme, show }) => `
    display: ${show ? 'block' : 'none'};
    padding: ${theme.spacing.xlarge}px ${theme.spacing.large}px;
    width: 100%;
  `
);

export { TabsContainer, TabsHeader, Tab, PanesContainer, Pane };
