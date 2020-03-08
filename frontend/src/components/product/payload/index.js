import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Line from "../../Line";
import StyleWrapper from './index.style';
import {CarouselBox} from "../../index";

class PayloadProducts extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Grid container={true}>
        <Grid item xs={12}>
          <StyleWrapper>
            {this.props.data.map((list, index) => {
              return(
                <div key={index} style={{position:'relative'}} className='alice-carousel-container'>
                  <Line title={list.title} link={list.link !== null ? list.link : ''} />
                  <CarouselBox items={list.products} />
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
