// theme
import { createStyledComponent, createStyledComponentWithProps } from 'styles/createStylesheet';

const Container = createStyledComponent(
  'section',
  theme => `
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.maxWidthContainer}px;
    padding: ${theme.spacing.large}px ${theme.spacing.medium}px;
  `
);

const Title = createStyledComponent(
  'h1',
  theme => `
    border-bottom: 5px solid #03a9f4;
    color: #03a9f4;
    font-size: 2em;
    margin-bottom: ${theme.spacing.xlarge}px;
    padding 0 ${theme.spacing.large}px;
    text-align: center;
    text-transform: uppercase;
  `
);

const Form = createStyledComponent(
  'form',
  () => `
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  `
);

const Label = createStyledComponentWithProps(
  'label',
  ({ error, theme }) => `
    cursor: pointer;
    margin-bottom: ${theme.spacing.large}px;
    width: 100%;

    > span {
      display: block;
      font-weight: bold;
      margin-bottom: ${theme.spacing.small}px;
      text-transform: uppercase;
    }

    .input {
      border: 1px solid #dedede;
      font-size: 1em;
      height: 40px;
      outline: 0;
      padding:${theme.spacing.base}px;
      width: 100%;
    }

    .textarea {
      max-height: 150px;
      max-width: 100%;
      min-height: 100px;
      min-width: 100%;
    }

    ${error &&
      `
      color: #bd0d0d;

      .input {
        color: #bd0d0d;
        border: 1px solid #ffb8b8;
      }
    `}
  `
);

const Button = createStyledComponentWithProps(
  'button',
  ({ theme, disabled }) => `
    background-color: black;
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    height: 50px;
    margin-top: ${theme.spacing.small}px;
    padding: ${theme.spacing.small}px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    ${disabled &&
      `
      color: #6d6d6d;
      cursor: not-allowed;
      background-color: gainsboro;
      border: 1px solid gainsboro;
    `}
  `
);

const ErrorMessage = createStyledComponent(
  'p',
  theme => `
    background-color: #ffb8b8;
    color: #bd0d0d;
    font-size: 0.8em;
    font-weight: bold;
    padding: ${theme.spacing.base}px;
    width: 100%;
  `
);

export { Container, Form, Label, Button, ErrorMessage, Title };
