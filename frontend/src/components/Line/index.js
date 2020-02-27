import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StyleWrapper from './line.style';

class Line extends Component {
  render() {
    return (
      <StyleWrapper>
        <div className="line">
          <h3>{this.props.title}</h3>
          <Link to={this.props.link}>مشاهده همه</Link>
        </div>
      </StyleWrapper>
    );
  }
}

export default Line;
