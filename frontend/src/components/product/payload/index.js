import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Line from "../../Line";
import StyleWrapper from './index.style';
import {CarouselBox} from "../../index";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Slider from "react-slick";
import Box from "../box/Box";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Fab
      aria-label="save"
      color="secondary"
      onClick={onClick}
      style={{ position:"absolute", right: '15px', top: 'calc(50% - 25px)', zIndex: '9999'}}
    >
      <ArrowForwardIosIcon />
    </Fab>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Fab
      aria-label="save"
      color="secondary"
      style={{ position:"absolute", left: '15px', top: 'calc(50% - 25px)', zIndex: '9999'}}
      onClick={onClick}
    >
      <ArrowForwardIosIcon style={{ transform: 'rotate(180deg)' }}/>
    </Fab>
  );
}



class PayloadProducts extends Component {

  constructor(props) {
    super(props);
  }




  render() {

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: this.props.number,
      autoplaySpeed: 2000,
      rtl: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <Grid container={true}>
        <Grid item xs={12}>
          <StyleWrapper>
            {this.props.data.map((list, index) => {
              return(
                <div key={index} style={{position:'relative'}} >
                  <Line title={list.title} link={list.link !== null ? list.link : ''} />
                  <div>
                    <Slider {...settings}>
                      {list.products.map((item, index) => {
                        return(
                          <div  key={index}>
                            <Box item={item} />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              );
            })}
          </StyleWrapper>
        </Grid>
      </Grid>
    );
  }
}

export default PayloadProducts;
