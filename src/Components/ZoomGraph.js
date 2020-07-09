import React, { PureComponent } from 'react';
import { Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import { convertToRealTime } from '../functions';
import { Ul, ZoomOutButton, SVGDiv, Modal, ModalHeader } from './Styles';
import { significantDates } from '../constants';
import InfoIcon from '@material-ui/icons/Info';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';



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
    // console.log("FROM", from, "TO", to);

    const refData = this.state.data.slice(from - 1, to);
    
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
  
    return [(bottom | 0) - offset, (top | 0) + offset];
  }; 

  zoom = (e) => {
    if(e){

      // e.target.className = "sc-fzpans iwByBU"
      let { refAreaLeft, refAreaRight, data } = this.state;
    
      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        this.setState(() => ({
          refAreaLeft: '',
          refAreaRight: '',
        }));
      }
    
      // xAxis domain
      // this line specifically allows the highlight to work right to left
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
      }));
    }
  }
  
  zoomOut = () => {
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
      <Modal style={{position: "fixed", top: 510, left: this.state.modalX > 375 ? this.state.modalX : this.state.modalX+ 480}}>
        <div>
          <ModalHeader>
            <InfoIcon fontSize="large" style={{color: "#2c99b5"}}/> 
            <p>On This Date,&nbsp;</p> 
            {this.state.modalDate + ':'}
          </ModalHeader>
        </div>
        <div className="article">
          <article>{this.state.modalContent}</article>
        </div>
      </Modal>
    )
  }

  render() {
    // console.log(this.props.isMobile)
    const legendStyle = {
      color: '#FFFFFF',
      fontSize: this.props.isMobile ? '.8em' : '1em'
    }
    
    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        
        {this.state.modal ? this.displayModal() : null}
        {
          this.state.left === 'dataMin' && this.state.right === 'dataMax' 
        ? 
          <ZoomOutButton style={{opacity: '0'}}></ZoomOutButton>
        : 
          <ZoomOutButton
            onClick={this.zoomOut}
          >
          <ZoomOutIcon/>
          Zoom Out
          </ZoomOutButton> 
      }
     
       <ResponsiveContainer aspect={2} width="100%">
        <LineChart
          // width={900}
          // height={400}
          margin={{right: 35, left: 25}}
          data={this.state.data}
          onMouseDown = { (e) => e && this.setState({refAreaLeft:e.activeLabel})}
          onMouseMove = { (e) => e && this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
          onMouseUp = {(e) => this.zoom(e) }
        >
          <CartesianGrid />
          <XAxis 
            allowDataOverflow={true}
            dataKey="date_number"
            tickFormatter={(tick) => convertToRealTime(tick, true)}
            domain={[this.state.left, this.state.right]}
            type="number"
            onMouseEnter={(e)=> {
              
              let time = convertToRealTime(e.value, true);
              if(significantDates[time]){  
                // also have to check if the content has multiple events
                // console.log(significantDates[time]);
                this.setState({
                  modal: true,
                  modalY: "327.6666717529297",
                  modalX: e.coordinate,
                  modalContent: significantDates[time],
                  modalDate: time
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
                    y={y+15}
                    stroke="none" 
                    fill={significantDates[something] ? "yellow" : "white"} 
                    fontSize="1rem"  
                    textAnchor="middle"
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
            
          />
          <Legend
            content ={(props)=> {
              const { payload } = props;
              return (
                <Ul>
                  {
                    payload.map((entry, index) => (
                      <SVGDiv key={index} onClick={() => this.toggleLine(index)}>
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
        </ResponsiveContainer>
      </div>
    );
  }
}
