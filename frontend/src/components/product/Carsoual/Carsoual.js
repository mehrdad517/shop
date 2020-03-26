import React, {Component} from 'react';
import Box from "../box/Box";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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

class CarouselBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = {
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
      <div>
        <Slider {...settings}>
          {this.props.items.map((item, index) => {
            return(
              <div  key={index}>
                <Box item={item} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default CarouselBox;
