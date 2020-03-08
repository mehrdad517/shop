import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MenuTree} from "../index";
import './sidebar.css'
import {Link} from "react-router-dom";

function mapStateToProps(state) {
  return {

  };
}

class Index extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-wrapper'>
          <div className='sidebar-logo'>
            <Link to={'/'}>
              <img src={require('../../static/Img/logo.jpg')}/>
            </Link>
          </div>
          <MenuTree nodes={this.props.setting.product_categories} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Index);
