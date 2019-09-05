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
      lines: 0.1,
      angle: 0.25, // The span of the gauge arc
      lineWidth: 0.1, // The line thickness
      colorStart: '#f00',   // Colors
      colorStop: '#a00',    // just experiment with them
      strokeColor: '#eee',
      percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]]
    };

    const target = document.getElementById(gagueID); // your canvas element
    const gauge = new Gauge.Donut(target).setOptions(opts); // create sexy gauge!
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
