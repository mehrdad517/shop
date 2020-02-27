/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Master from '../../components/Layouts/master';
import {lastBlogPortsAction, payloadProductsAction, sliderAction} from '../../actions';
import {LastBlogPosts, Slider, PayloadProducts} from '../../components';
import {Container} from "@material-ui/core";

// Export this for unit testing more easily
export class Home extends PureComponent {
  componentDidMount() {
    const { fetchLastBlogPostsIfNeeded, fetchSliderIfNeeded, fetchPayloadProductsIfNeeded } = this.props;

    fetchSliderIfNeeded();
    fetchPayloadProductsIfNeeded();
    fetchLastBlogPostsIfNeeded();
  }

  render() {
    return (
      <Master>
        <Helmet title="Home" />
        <Container>
          {this.props.slider.readyStatus === 'success' && <Slider slides={this.props.slider} />}
          {this.props.payloadProducts.readyStatus === 'success' && <PayloadProducts data={this.props.payloadProducts.data} />}
          {this.props.lastBlogPosts.readyStatus === 'success' && <LastBlogPosts data={this.props.lastBlogPosts.data} />}
        </Container>
      </Master>
    );
  }
}

function mapStateToProps(state) {
  return {
    payloadProducts: state.payloadProducts,
    lastBlogPosts: state.lastBlogPosts,
    slider: state.slider
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLastBlogPostsIfNeeded: () => {
      dispatch(lastBlogPortsAction.fetchLastBlogPostsIfNeeded());
    },
    fetchSliderIfNeeded: () => {
      dispatch(sliderAction.fetchSliderIfNeeded());
    },
    fetchPayloadProductsIfNeeded: () => {
      dispatch(payloadProductsAction.fetchPayloadProductsIfNeeded());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
