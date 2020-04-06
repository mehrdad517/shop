/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container } from '@material-ui/core';
import Master from '../../components/Layouts/master';
import {
  blogAction,
  lastBlogPortsAction,
  payloadProductsAction,
  sliderAction
} from '../../actions';
import {
  LastBlogPosts,
  Slider,
  PayloadProducts,
  MenuTree
} from '../../components';

// Export this for unit testing more easily
export class Home extends PureComponent {
  componentDidMount() {
    const {
      blogIfNeeded,
      fetchSliderIfNeeded,
      fetchPayloadProductsIfNeeded
    } = this.props;

    fetchSliderIfNeeded();
    fetchPayloadProductsIfNeeded();
    blogIfNeeded();
  }

  render() {
    return (
      <Master>
        <Helmet title="Home" />
        <Container>
          {this.props.slider.readyStatus === 'success' && (
            <Slider slides={this.props.slider} />
          )}
           {this.props.payloadProducts.readyStatus === 'success' && <PayloadProducts data={this.props.payloadProducts.data} />}
          {this.props.blog.readyStatus === 'success' && (
            <LastBlogPosts data={this.props.blog.data.contents.data} />
          )}
        </Container>
      </Master>
    );
  }
}

function mapStateToProps(state) {
  return {
    payloadProducts: state.payloadProducts,
    blog: state.blog,
    slider: state.slider
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blogIfNeeded: () => {
      dispatch(blogAction.blogIfNeeded({ page: 1, limit: 4 }));
    },
    fetchSliderIfNeeded: () => {
      dispatch(sliderAction.fetchSliderIfNeeded());
    },
    fetchPayloadProductsIfNeeded: () => {
      dispatch(payloadProductsAction.fetchPayloadProductsIfNeeded());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
