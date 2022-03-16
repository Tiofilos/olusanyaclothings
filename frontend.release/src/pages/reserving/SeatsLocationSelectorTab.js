import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import seatLocation from '../../helpers/seatLocation';
import humanPositions from '../../helpers/humanPositions';

export default function SeatsLocationSelectorTab({ textButton, cbSelection, eveningMode, setEveningMode }) {
  const [chosenLocation, setChosenLocation] = useState(null);
  const [selectionInfo, setSelectionInfo] = useState('you haven\'t selected anything yet');
  const [textSwitch, setTextSwitch] = useState('Matinee');

  useEffect(() => {
    if (eveningMode) setTextSwitch('Evening');
    else setTextSwitch('Matinee');
  }, [setTextSwitch, eveningMode]);

  // Change the selection info according of chosen location value
  useEffect(() => {
    if (chosenLocation === null) {
      setSelectionInfo('you haven\'t selected anything yet');
    } else {
      setSelectionInfo(`you have selected ${humanPositions[chosenLocation]}`);
    }
  }, [chosenLocation]);

  // Style for SVG

  const seatStyle = {
    fill: '#a0623d',
    fillRule: 'evenodd',
    stroke: '#180503',
    strokeWidth: 1.00000001,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    strokeOpacity: 1,
    fillOpacity: 1,
    strokeMiterlimit: 4,
    strokeDasharray: 'none',
  };

  const stageStyle = {
    fill: '#d2a473',
    fillRule: 'evenodd',
    stroke: '#180503',
    strokeWidth: 1.00000001,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    strokeOpacity: 1,
    fillOpacity: 1,
    strokeMiterlimit: 4,
    strokeDasharray: 'none',
  };

  const textStyleBox = {
    textAlign: 'center',
    textAnchor:'middle',
  };

  const textStyle = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10.5833px',
    lineHeight: '125%',
    fontFamily: 'Sans',
    letterSpacing: '0px',
    wordSpacing: '0px',
    whiteSpace: 'pre',
    fill: '#000000',
    fillOpacity: 1,
    stroke: 'none',
    strokeWidth: '0.264583px',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    strokeOpacity: 1,
  };

  // Return the dynamic style for the seats location
  const getSeatStyle = (location) => {
    if (location !== chosenLocation) {
      // Return default style
      return seatStyle;
    }
    return {...seatStyle, fill: '#180503'};
  }

  // Return the dynamic style for the text
  const getTextStyle = (location) => {
    if (location !== chosenLocation) {
      // Return default style
      return textStyle;
    }
    return {...textStyle, fill: '#D2A473'};
  }

  const onSelectStalls = () => {
    setChosenLocation(seatLocation.stalls);
  };

  const onSelectCircle = () => {
    setChosenLocation(seatLocation.circle);
  };

  const onSelectUpperCircle = () => {
    setChosenLocation(seatLocation.upperCircle);
  };

  const onPressNext = () => {
    if (cbSelection) cbSelection(chosenLocation);
  }

  return (
    <div>
      <h3>Choose the seating location</h3>
      <div className="d-flex justify-content-center g-2">
        {/* <svg width="700" height="616" viewBox="0 0 185.20833 162.98334"> */}
        <svg width="350" height="308" viewBox="0 0 185.20833 162.98334">
          <g id="layerUppercircle" style={{cursor: 'pointer'}} onClick={onSelectUpperCircle}>
            <path
              style={getSeatStyle(seatLocation.upperCircle)}
              d="M 0.89351993,123.85751 C 9.9527201,126.74533 17.622285,125.5914 19.047419,121.43078 L 44.696304,46.549936 c 0.470978,-1.374999 1.313446,-3.107153 3.341378,-3.477636 0,0 85.584298,-1.556769 87.134668,-1.009968 1.55037,0.546799 2.96846,1.872353 3.4926,3.174865 0.52414,1.302515 27.73403,74.384343 27.73403,74.384343 1.32559,2.32883 5.91264,6.07616 17.74117,2.24366 -9.57426,-25.785181 -28.72277,-77.355543 -28.72277,-77.355543 -0.66952,-1.803135 -3.0443,-4.465699 -4.89753,-6.051844 -13.87944,-11.879161 -29.35424,-21.328627 -32.76234,-23.40028 -1.31136,-0.797124 -5.47759,-2.214452 -6.30446,-2.298779 L 91.690621,10.743304 74.1404,12.559898 c -1.648219,0.170604 -5.212558,0.800139 -9.635365,3.209106 -6.796773,3.701993 -27.533699,19.76673 -33.140889,25.398687 -1.838511,1.846632 -3.271716,4.923708 -3.907256,6.740819 z"
            />
            <text style={getTextStyle(seatLocation.upperCircle)}>
              <tspan x="92" y="35"><tspan style={textStyleBox}>UPPER CIRCLE</tspan></tspan>
            </text>
          </g>
          <g id="layerUppercircle" style={{cursor: 'pointer'}} onClick={onSelectCircle}>
            <path
              style={getSeatStyle(seatLocation.circle)}
              d="M 161.10946,117.24817 138.73447,59.757872 c -0.84856,-2.180284 -4.3648,-5.84117 -6.34048,-5.824314 l -79.756069,0.680431 c -2.520687,0.02151 -6.525096,3.349035 -7.606842,6.353926 L 24.326011,118.4828 c 7.467791,3.10364 13.505733,1.53867 14.337907,-0.90145 L 52.139574,78.067754 c 0.868763,-2.547405 4.673761,-6.089606 7.199759,-6.110827 l 65.288327,-0.548486 c 2.37685,-0.01997 6.50414,2.642568 7.44027,5.218538 l 14.31177,39.382141 c 0.62731,1.7262 4.71021,5.46399 14.72976,1.23905 z"
            />
            <text style={getTextStyle(seatLocation.circle)}>
              <tspan x="92" y="66"><tspan style={textStyleBox}>CIRCLE</tspan></tspan>
            </text>
          </g>
          <g id="layerUppercircle" style={{cursor: 'pointer'}} onClick={onSelectStalls}>
            <path
              style={getSeatStyle(seatLocation.stalls)}
              d="M 39.052938,148.01183 147.02449,146.78655 127.30205,84.433464 c -0.53043,-1.676985 -3.31698,-5.150886 -6.06682,-5.128799 l -57.894855,0.46502 c -2.797546,0.02247 -5.39007,1.902236 -6.049658,4.217742 z"
            />
            <text style={getTextStyle(seatLocation.stalls)}>
              <tspan x="92" y="115"><tspan style={textStyleBox}>STALLS</tspan></tspan>
            </text>
          </g>
          <path
            style={stageStyle}
            d="m 36.105516,161.89771 2.555841,-7.37894 108.839313,-1.33956 2.82751,7.26799"
            inkscape_label="stage" />
        </svg>
      </div>
      <div className="text-center">
        <p>{selectionInfo}</p>
      </div>

      <div className="d-flex justify-content-between my-3">
        <Form>
          <Form.Check 
            type="switch"
            id="custom-switch"
            onChange={(e) => setEveningMode(e.target.checked)}
            label={textSwitch}
          />
        </Form>
        <Button
          variant="primary"
          onClick={onPressNext}
          disabled={chosenLocation === null
        }>{textButton}</Button>
      </div>
    </div>
  );
}