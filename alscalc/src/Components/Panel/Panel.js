import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#000',
  },
};

class Panel extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div>
        <Tabs value={index} fullWidth onChange={this.handleChange} style={styles.tabs}>
          <Tab label="Findings" />
          <Tab label="Results" />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>{this.props.findings}</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>{this.props.results}</div>
        </SwipeableViews>
      </div>
    );
  }
}

export default Panel;