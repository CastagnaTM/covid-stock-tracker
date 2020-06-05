import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';

export default class ZoomGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
      animation: true,
    };
  }
  static getDerivedStateFromProps(nextProps) {    
    return {
      data: nextProps.data,
    }
  }
  getAxisYDomain = (from, to, ref, offset) => {
    console.log("FROM", from, "TO", to);

    const refData = this.state.data.slice(from - 1, to);
    // console.log("REFDATA",refData);
    // console.log("DATA",this.state.data);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
  
    return [(bottom | 0) - offset, (top | 0) + offset];
  };
  
  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'low_price', 1);
    const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'high_price', 50);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    }));
  }

  render() {
    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        <button
          // href="javascript: void(0);"
          className="btn update"
          onClick={this.zoomOut.bind(this)}
        >
          Zoom Out

        </button>

        <LineChart
                width={800}
                height={400}
                data={this.state.data}
                onMouseDown = { (e) => this.setState({refAreaLeft:e.activeLabel}) }
                onMouseMove = { (e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
                onMouseUp = { this.zoom.bind( this ) }
              >
                <CartesianGrid strokeDasharray="3 3"/>
                {console.log(this.state.data)}
                <XAxis 
                  allowDataOverflow={true}
                  dataKey="name"
                  domain={[this.state.left, this.state.right]}
                  type="number"
                />
                <YAxis 
                  allowDataOverflow={true}
                  domain={[this.state.bottom, this.state.top]}
                  type="number"
                  yAxisId="1"
                 />
                {/* <YAxis 
                  orientation="right"
                  allowDataOverflow={true}
                  domain={[this.state.bottom2, this.state.top2]}
                  type="number"
                  yAxisId="2"
                 />  */}
                <Tooltip/>
                <Line yAxisId="1" type='natural' dataKey='open_price' stroke='#8884d8' animationDuration={300}/>
                <Line yAxisId="1" type='natural' dataKey='close_price' stroke='#82ca9d' animationDuration={300}/>
                <Line yAxisId="1" type='natural' dataKey='low_price' stroke='#82ca9d' animationDuration={300}/>
                <Line yAxisId="1" type='natural' dataKey='high_price' stroke='#82ca9d' animationDuration={300}/>


                {
                    (this.state.refAreaLeft && this.state.refAreaRight) ? (
                  <ReferenceArea yAxisId="1" x1={this.state.refAreaLeft} x2={this.state.refAreaRight}  strokeOpacity={0.3} /> ) : null

                }

              </LineChart>

      </div>
    );
  }
}
