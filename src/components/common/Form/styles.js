// theme
import { createStyledComponent, createStyledComponentWithProps } from 'styles/createStylesheet';

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

const Label = createStyledComponentWithProps(
  'label',
  ({ theme, error, required }) => `
    cursor: pointer;
    margin-bottom: ${theme.spacing.xlarge}px;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    .label-text {
      display: block;
      font-weight: bold;
      margin-bottom: ${theme.spacing.small}px;
      padding-left: ${theme.spacing.small}px;
      text-transform: uppercase;

      ${required &&
        `
        &::after {
          color: red;
          content: '*';
          margin-left: ${theme.spacing.small}px;
        }
      `}
    }

    .input-element {
      background-color: #f3f3f3;
      border-radius: 5px;
      border: 1px solid #dedede;
      font-size: ${theme.fontSize.normal};
      height: 40px;
      outline: 0;
      padding:${theme.spacing.base}px;
      width: 100%;

      &:focus {
        background-color: #f9fdff;
        border: 1px solid #00a5ff;
        box-shadow: ${theme.shadow.base('#00a5ff')};
      }
    }

    .textarea {
      height: 150px;
      resize: none;
    }

    .error-message {
      color: #bd0d0d;
      font-size: ${theme.fontSize.small};
      font-style: italic;
      font-weight: bold;
      padding: ${theme.spacing.xsmall}px ${theme.spacing.small}px;
      text-align: right;
    }

    ${
      error
        ? `
      color: #bd0d0d;

      .input-element {
        background-color: #fff4f4;
        border-radius: 0;
        border: 1px solid #ffb8b8;
        color: #bd0d0d;

        &:focus {
          background-color: #fff4f4;
          border: none;
          box-shadow: ${theme.shadow.base('#ffb8b8')};
        }
      }
    `
        : ''
    }
  `
);

export { FormContainer, Title, Form, Label };
