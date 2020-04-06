import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sidebar.css';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { MenuTree } from '../index';

function mapStateToProps(state) {
  return {};
}

class Index extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="sidebar-logo">
            <Link to="/" onClick={() => this.props.onClose()}>
              <img src={require('../../static/Img/9760b8af.svg')} />
            </Link>
          </div>
          <Divider />
          <MenuTree  onClose={() => this.props.onClose()} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
