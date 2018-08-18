// theme
import { createStyledComponent } from 'styles/createStylesheet';

const FormContainer = createStyledComponent(
  'section',
  theme => `
    border-radius: 10px 0 10px 0;
    box-shadow: ${theme.shadow.base('gray')};
    overflow: hidden;
    width: 100%;
  `
);

const Title = createStyledComponent(
  'h1',
  theme => `
    background-color: #4c5661;
    color: white;
    font-size: ${theme.fontSize.large};
    padding ${theme.spacing.base}px;
    text-align: center;
    text-transform: uppercase;
  `
);

const Form = createStyledComponent(
  'form',
  theme => `
    .inputs-container {
      padding: ${theme.spacing.xlarge}px ${theme.spacing.large}px;
      width: 100%;
    }

    .fieldset {
      align-items: center;
      border: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
  `
);

export { FormContainer, Title, Form };
