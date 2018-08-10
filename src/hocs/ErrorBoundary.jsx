// npm libs
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    hasError: false,
    // errorInfo: undefined,
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState(() => ({
      hasError: true,
      errorInfo: info,
    }));
  }

  render() {
    if (this.state.hasError) {
      return <div>Error catched</div>;
    }
    return this.props.children();
  }
}

export default ErrorBoundary;
