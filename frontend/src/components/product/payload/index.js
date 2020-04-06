import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Line from '../../Line';
import Box from '../box/Box';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';


class PayloadProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5
        }
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          {this.props.data.map((list, index) => {
            return (
              <div key={index}>
                <Line
                  title={list.title}
                  link={list.link !== null ? list.link : ''}
                />
                <div style={{ marginTop: '40px'}}>
                  <Swiper {...params}>
                    {list.products.map((item, index) => {
                      return (
                        <div>
                          <Box item={item} />
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default PayloadProducts;
