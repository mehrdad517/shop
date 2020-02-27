import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import StyleWrapper from './paginator.style';

class Paginator extends Component {
  render() {
    return (
      <StyleWrapper>
        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.props.onChange}
        />
      </StyleWrapper>
    );
  }
}

export default Paginator;
