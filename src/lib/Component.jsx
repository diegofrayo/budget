// npm libs
import React from 'react';
import PropTypes from 'prop-types';

class Component extends React.Component {
  componentWillMount() {
    this.setState({ ...this.props.state });
  }

  componentDidMount() {
    this.props.componentDidMount(this.setState.bind(this), this.getState);
  }

  getState = () => this.state;

  render() {
    if (this.state === null) return null;
    const { children, events, properties, componentProps } = this.props;
    return children(this.state, this.setState.bind(this), componentProps, events, properties);
  }
}

Component.propTypes = {
  children: PropTypes.func.isRequired,
  componentDidMount: PropTypes.func,
  componentProps: PropTypes.object,
  events: PropTypes.object,
  properties: PropTypes.object,
  state: PropTypes.object,
};

Component.defaultProps = {
  componentProps: {},
  events: {},
  properties: {},
  state: {},
  componentDidMount: () => {},
};

export default Component;
