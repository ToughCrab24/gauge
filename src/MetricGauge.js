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
    const opts = {
      angle: 0.005, // The span of the gauge arc
      lineWidth: 0.22, // The line thickness
      pointer: {
        length: 0, // Relative to gauge radius
        strokeWidth: 0.0, // The thickness
      },
      colorStart: '#6FADCF', // Colors
      colorStop: '#8FC0DA', // just experiment with them
      strokeColor: '#E0E0E0', // to see which ones work best for you
    };

    const target = document.getElementById(gagueID); // your canvas element
    const gauge = new Gauge.Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = maxValue; // set max gauge value
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
  value: 50,
  minValue: 0,
};

export default MetricGauge;
