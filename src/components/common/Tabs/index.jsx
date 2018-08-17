// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// styles
import { TabsContainer, TabsHeader, Tab, PanesContainer, Pane } from './styles';

class Tabs extends React.Component {
  static initialState = {
    selectedTabIndex: 0,
  };

  state = { ...Tabs.initialState };

  componentDidMount() {}

  onClickTab = event => {
    this.setState({
      selectedTabIndex: Number(event.currentTarget.getAttribute('data-index')),
    });
  };

  render() {
    const { tabs, panes } = this.props;
    const { selectedTabIndex } = this.state;

    return (
      <TabsContainer>
        <TabsHeader>
          {tabs.map((tab, index) => (
            <Tab
              data-index={index}
              key={tab.key}
              selected={index === selectedTabIndex}
              onClick={this.onClickTab}
            >
              {tab.text}
            </Tab>
          ))}
        </TabsHeader>
        <PanesContainer>
          {panes.map((pane, index) => (
            <Pane key={pane.key} show={index === selectedTabIndex}>
              {pane.render()}
            </Pane>
          ))}
        </PanesContainer>
      </TabsContainer>
    );
  }
}

Tabs.propTypes = {
  panes: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
};

export default Tabs;
