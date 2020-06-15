import React, { PureComponent } from 'react';
import { Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import { convertToRealTime } from '../functions';
import { Ul, ZoomOutButton, SVGDiv, Modal } from './Styles';
import { significantDates } from '../constants';
export default class ZoomGraph extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      left : 'dataMin',
      right : 'dataMax',
      refAreaLeft : '',
      refAreaRight : '',
      top : dataMax => (Math.floor(dataMax)+1),
      bottom : dataMin => (Math.floor(dataMin)-1),
      top2 : dataMax => (Math.floor(dataMax)+20),
      bottom2 : dataMin => (Math.floor(dataMin)-20),
      animation : true,
      open: true,
      close: true,
      high: true,
      low: true,
      modal: false
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
    // const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'low_price', 1);
    // const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'high_price', 50);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      // bottom,
      // top,
      // bottom2,
      // top2,
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
      top : dataMax => (Math.floor(dataMax)+1),
      bottom : dataMin => (Math.floor(dataMin)-1),
      top2 : dataMax => (Math.floor(dataMax)+20),
      bottom2 : dataMin => (Math.floor(dataMin)-20)
    }));
  }

  toggleLine = (index) => {
    switch (index) {
      case 0:
        this.setState({
          open: !this.state.open
        });
        break;
      case 1:
        this.setState({
          close: !this.state.close
        });
        break;
      case 2:
        this.setState({
          low: !this.state.low
        });
        break;
      case 3:
        this.setState({
          high: !this.state.high
        });
        break;
      default:
        this.setState({
          open: true,
          close: true,
          low: true,
          high: true
        })
        break;
    }
  }

  displayModal = () => {
    return (
      <Modal style={{position: "fixed", top: this.state.modalY, left: this.state.modalX > 375 ? this.state.modalX : this.state.modalX+ 480}}>
        {this.state.modalContent}
      </Modal>
    )
  }

  render() {
    // const {
    //   data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    // } = this.state;

    const legendStyle = {
      color: '#FFFFFF'
    }
    //recharts-default-legend

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        {this.state.modal ? this.displayModal() : null}
        <ZoomOutButton
          onClick={this.zoomOut.bind(this)}
        >
          Zoom Out
        </ZoomOutButton>

        <LineChart
          width={900}
          height={400}
          margin={{right: 35, left: 25}}
          data={this.state.data}
          onMouseDown = { (e) => e && this.setState({refAreaLeft:e.activeLabel})}
          onMouseMove = { (e) => e && this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
          onMouseUp = { this.zoom.bind( this ) }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            allowDataOverflow={true}
            dataKey="date_number"
            tickFormatter={(tick) => convertToRealTime(tick, true)}
            domain={[this.state.left, this.state.right]}
            type="number"
            onMouseEnter={(e)=> {
              console.log(e)
              let time = convertToRealTime(e.value, true);
              if(significantDates[time]){  
                // also have to check if the content has multiple events
                // console.log(significantDates[time]);
                this.setState({
                  modal: true,
                  modalY: "327.6666717529297",
                  modalX: e.coordinate,
                  modalContent: significantDates[time]
                })
                // pop up modal with the content 
              }
            }}
            onMouseLeave={ () => {
              this.state.modal &&
              this.setState({
                modal: false
              })
            }
            }
            tick={props => {
              const { payload,x,y } = props;
              let something = convertToRealTime(payload.value,true)

              return (
                <text 
                    width="830"
                    height="30" 
                    x= {x} 
                    y={y+10}
                    stroke="none" 
                    fill={significantDates[something] ? "yellow" : "white"} 
                    font-size="1rem"  
                    text-anchor="middle"
                    >
                            {something}
                    </text>
              )
            }}
            tickCount={7}
            

            
          />
          <YAxis 
            allowDataOverflow={true}
            domain={[this.state.bottom, this.state.top]}
            type="number"
            yAxisId="1"
            tick={{fontSize: '1rem', fill: '#FFFFFF'}}
            padding={{bottom: 8}}
            />
          <Tooltip 
            labelFormatter={(label) => convertToRealTime(label, true)}
            // contentStyle={{fontSize: '1.2rem'}}
          />
          <Legend
            content ={(props)=> {
              const { payload } = props;
              return (
                <Ul>
                  {
                    payload.map((entry, index) => (
                      <SVGDiv key={index} onClick={() => this.toggleLine(index)}>
                        {/* <svg className="recharts-surface" width="20" height="20" style={{marginRight: '0.5rem', marginTop:'0.2rem'}} viewBox="0 0 32 32" version="1.1">
                          <path fill={entry.color} className="recharts-symbols" transform="translate(16, 16)" d="M5.856406460551019,3.381197846482995L5.856406460551019,15.094010767585033L-5.856406460551019,15.094010767585033L-5.856406460551019,3.3811978464829937L-16,-2.475208614068025L-10.143593539448982,-12.618802153517008L4.440892098500626e-16,-6.762395692965988L10.143593539448982,-12.618802153517008L16,-2.475208614068025Z"></path>
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path fill={entry.color} d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                        </svg>
                        <li key={`item-${index}`}>{entry.value}</li>
                      </SVGDiv>
                    ))
                  }
                </Ul>
              );
            }} 
            iconSize={20} 
            iconType='wye' 
            wrapperStyle={legendStyle}
          />
          <Line yAxisId="1" type='natural' dataKey='open_price' name="Open Price" stroke={this.state.open ? '#8804d8': 'transparent'} animationDuration={300} dot={false}/>
          <Line yAxisId="1" type='natural' dataKey='close_price' name="Close Price" stroke={this.state.close ? '#8084d8' : 'transparent'} animationDuration={300} dot={false}/>   
          <Line yAxisId="1" type='natural' dataKey='low_price' name="Low Price" stroke= {this.state.low ? '#f45b5b' : 'transparent'} animationDuration={300} dot={false}/>   
          <Line yAxisId="1" type='natural' dataKey='high_price' name="High Price" stroke={this.state.high ? '#82ca9d' : 'transparent'} animationDuration={300} dot={false}/>     
          {
              (this.state.refAreaLeft && this.state.refAreaRight) ? (
            <ReferenceArea yAxisId="1" x1={this.state.refAreaLeft} x2={this.state.refAreaRight}  strokeOpacity={0.3} /> ) : null
          }
        </LineChart>
      </div>
    );
  }
}
