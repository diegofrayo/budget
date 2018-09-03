// theme
import { createStyledComponent } from 'styles';

const FormContainer = createStyledComponent(
  'section',
  theme => `
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
    font-size: ${theme.fontSize[5]};
    padding ${theme.spacing[0]};
    text-align: center;
    text-transform: uppercase;

    ${theme.mediaQueries.mobile.css} {
      font-size: ${theme.fontSize[3]};
    }
  `
);

const Form = createStyledComponent(
  'form',
  theme => `
    .inputs-container {
      padding: ${theme.spacing[4]} ${theme.spacing[3]};
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
