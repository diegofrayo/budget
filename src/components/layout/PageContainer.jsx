// theme
import { createStyledComponent } from 'styles/createStylesheet';

export default createStyledComponent(
  'section',
  theme => `
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.maxWidthContainer}px;
  `
);
