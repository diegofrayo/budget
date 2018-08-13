// theme
import { createStyledComponentWithProps } from 'styles/createStylesheet';

export default createStyledComponentWithProps(
  'section',
  ({ theme, fullHeight }) => `
    align-items: center;
    display: flex;
    flex-direction: column;
    height: ${fullHeight ? '100%' : 'auto'};
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.maxWidthContainer}px;
    padding: ${theme.spacing.xlarge}px ${theme.spacing.large}px;
  `
);
