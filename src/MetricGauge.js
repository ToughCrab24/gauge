import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Gauge from 'gaugeJS';

import { Box } from 'rebass';

const generateID = () => `_${Math.random().toString(36).substr(2, 9)}`;

const MetricValue = styled(Box)`
  text-align: center;
  margin-top: -50px;
`;

class MetricGauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gagueID: '',
    };
  }

  componentWillMount() {
    this.setState({
      gagueID: generateID(),
    });
  }

  componentDidMount() {
    const { gagueID } = this.state;
    const { maxValue, value, minValue } = this.props;

    // explicit color calc
    var color = '#ff0000';    // red
    if (value < (maxValue / 3)) {
      color = '#a9d70b';      // green
    } else if (value < ((maxValue / 3) * 2)) {
      color = '#f9c802';      // yellow
    }

    const opts = {
      lines: 0.1,
      angle: 0.15, // The span of the gauge arc
      lineWidth: 0.1, // The line thickness
      limitMax: false,
      colorStop: color,         // just experiment with them
      strokeColor: '#eeeeee',   // light grey
      generateGradient: true,
      highDpiSupport: true,
    };

    const target = document.getElementById(gagueID); // your canvas element
    const gauge = new Gauge.Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = maxValue; // set max gauge value
    gauge.animationSpeed = 10;
    gauge.setMinValue(minValue); // set min value
    gauge.set(value); // set actual value
  }

  render() {
    const { gagueID } = this.state;
    const { value, unit } = this.props;

    return (
      <Box>
        <canvas id={gagueID} />
        <MetricValue>
          {value}
          {unit}
        </MetricValue>
      </Box>
    );
  }
}

MetricGauge.propTypes = {
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  value: PropTypes.number,
  unit: PropTypes.string,
};

MetricGauge.defaultProps = {
  maxValue: 100,
  unit: 'GB',
  value: 20,
  minValue: 0,
};

export default MetricGauge;
