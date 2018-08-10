// npm libs
import React from 'react';
import PropTypes from 'prop-types';

class Component extends React.Component {
  componentWillMount() {
    this.setState({ ...this.props.state });
  }

  render() {
    if (this.state === null) return null;
    const { children, events, properties } = this.props;
    return children(this.state, this.setState.bind(this), events, properties);
  }
}

Component.propTypes = {
  children: PropTypes.func.isRequired,
  events: PropTypes.object,
  properties: PropTypes.object,
  state: PropTypes.object,
};

Component.defaultProps = {
  events: {},
  properties: {},
  state: {},
};

export default Component;
