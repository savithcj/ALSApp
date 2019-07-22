import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";

const styles = {
  tabs: {
    background: "#bfbfbf",
    bottom: "0px"
  },

  slide: {
    padding: 85,
    minHeight: 100,
    color: "#000",
    display: "flex",
    justifyContent: "center"
  }
};

class Panel extends React.Component {
  state = {
    index: 0
  };

  handleChange = (event, value) => {
    this.setState({
      index: value
    });
    this.props.changed();
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>{this.props.findings}</div>

          <div style={Object.assign({}, styles.slide, styles.slide3)}>{this.props.results}</div>
        </SwipeableViews>
        <Tabs value={index} variant="fullWidth" onChange={this.handleChange} style={styles.tabs}>
          <Tab label="Findings" />
          <Tab label="Results" />
        </Tabs>
      </div>
    );
  }
}

export default Panel;
