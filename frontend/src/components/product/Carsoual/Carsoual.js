import React, {Component} from 'react';
import StyleWrapper from './Carsoual.style';
import Box from "../box/Box";
import {Tooltip} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class CarouselBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      boxwidth: 260,
      bodywidth: 0
    }
  }

  componentDidMount() {
    let maincarsoual = document.querySelectorAll('.carsoual-box')
    document.addEventListener('DOMContentLoaded',()=>{
      this.setState({
        boxwidth: maincarsoual[0].clientWidth
      })
    })
    this.setState({
      bodywidth: this.props.items.length * this.state.boxwidth
    })
    setInterval(() => {
      this.nextbtn()
    }, 2000)


  }

  nextbtn() {
    if (this.state.position !== 0) {
      this.setState({
        position: this.state.position + this.state.boxwidth
      })
    }

  }

  prevbtn() {
    let scrollingwidth = document.querySelector('.scrolling')
    if (this.state.position !== -(this.state.bodywidth)) {
      this.setState({
        position: this.state.position - this.state.boxwidth
      })
    }
    if (this.state.position < scrollingwidth.clientWidth-(this.state.bodywidth)) {
      this.setState({
        position: 0
      })
    }
  }
  render() {
    return (
      <StyleWrapper>
        <div className='scroll-carsoual' style={{with: 100}}>
          <div className='scrolling'>
            <div style={{transform: `translateX(${-this.state.position}px)`, width: this.state.bodywidth}} className='main-carsoual'>

              {this.props.items.map((item, index) => {
                return(
                  <div  key={index} className='carsoual-box'>
                    <Box item={item} />
                  </div>
                );
              })}

            </div>
              <Fab
                className='next-btn'
                aria-label="save"
                color="secondary"
                onClick={(index) => {this.prevbtn(index)}}

              >
                <ArrowForwardIosIcon />
              </Fab>
              <Fab
                aria-label="save"
                color="secondary"
                className='prev-btn'
                onClick={(index) => {this.nextbtn(index)}}
              >
                <ArrowForwardIosIcon style={{ transform: 'rotate(180deg)' }} />
              </Fab>
          </div>
        </div>
      </StyleWrapper>
    );
  }
}

export default CarouselBox;
