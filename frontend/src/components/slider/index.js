import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import StyleWrapper from './slider.style';

const effects = [
  // 'zoomInLeft', 'zoomInRight','zoomInUp', 'zoomInDown',
  // 'slideInDown',	'slideInLeft'	,'slideInRight'	,'slideInUp',
  // 'lightSpeedIn',
  // 'headShake',  'shake',
  // 'bounce','flash','pulse','rubberBand',
  // 'swing'	,'tada',
  'fadeIn'
];

const captionEffects = [
  // 'flip',
  // 'flipInX', 'flipInY',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'lightSpeedIn'
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      Interval: '',
      effect: 'fadeIn',
      captionEffect: 'flip'
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.Interval);
  }

  componentDidMount() {
    clearInterval(this.state.Interval);
    const get = document.querySelector('.items > div');
    get.classList.add('seen', 'animated', this.state.effect);
    this.startloop();
  }

  startloop() {
    this.setState({
      Interval: setInterval(() => {
        this.nextSlide();
      }, 3000)
    });
  }

  nextSlide() {
    clearInterval(this.state.Interval);
    const Images = document.querySelectorAll('.items > div');
    const seen = document.querySelector('.seen');
    if (seen) {
      seen.classList.remove('seen', 'animated', this.state.effect);
      if (seen.nextElementSibling) {
        seen.nextElementSibling.classList.add(
          'seen',
          'animated',
          this.state.effect
        );
      }
      if (!seen.nextElementSibling) {
        Images[0].classList.add('seen', 'animated', this.state.effect);
      }
    }
    this.startloop();
  }

  prevSlide() {
    clearInterval(this.state.Interval);
    const Images = document.querySelectorAll('.items > div');
    const seen = document.querySelector('.seen');
    if (seen) {
      seen.classList.remove('seen', 'animated', this.state.effect);
      if (seen.previousElementSibling) {
        seen.previousElementSibling.classList.add(
          'seen',
          'animated',
          this.state.effect
        );
      }
      if (!seen.previousElementSibling) {
        console.log(Images.length);
        Images[Images.length - 1].classList.add(
          'seen',
          'animated',
          this.state.effect
        );
      }
    }

    this.startloop();
  }

  render() {
    return (
      <StyleWrapper>
        <Box boxShadow={3} component="div" className="slider">
          <div className="items">
            {this.props.slides.data.length > 0 &&
              this.props.slides.data.map((item, index) => {
                return (
                  <div key={index}>
                    {item.link ? (
                      <a href={item.link}>
                        <img alt={item.caption} src={item.address} />
                        {item.caption && (
                          <div
                            style={{
                              right: `${Math.floor(
                                Math.random() * Math.floor(600)
                              )}px`,
                              bottom: `${Math.floor(
                                Math.random() * Math.floor(200)
                              )}px`
                            }}
                            className={`slideTitle animated ${this.state.captionEffect}`}
                          >
                            <p>{item.caption}</p>
                          </div>
                        )}
                      </a>
                    ) : (
                      <div>
                        <img alt={item.caption} src={item.address} />
                        {item.caption && (
                          <div
                            style={{
                              right: `${Math.floor(
                                Math.random() * Math.floor(600)
                              )}px`,
                              bottom: `${Math.floor(
                                Math.random() * Math.floor(200)
                              )}px`
                            }}
                            className={`slideTitle animated ${this.state.captionEffect}`}
                          >
                            <p>{item.caption}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

            <ArrowForwardIosIcon  className="nextSlider" onClick={() => {
              this.nextSlide();
            }} />

            <ArrowForwardIosIcon className="prevSlider" onClick={() => {
              this.prevSlide();
            }} style={{ transform: 'rotate(180deg)' }} />
        </Box>
      </StyleWrapper>
    );
  }
}

export default Index;
