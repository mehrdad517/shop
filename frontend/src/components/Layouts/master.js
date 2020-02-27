import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { settingAction } from '../../actions';
import { Footer } from '../index';
class Master extends PureComponent {
  componentDidMount() {
    const { fetchSettingIfNeeded } = this.props;
    fetchSettingIfNeeded();
  }

  render() {
    return (
      <div>
        <div style={{ minHeight: '500px'}}>
          {this.props.children}
        </div>
        <Footer setting={this.props.setting} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSettingIfNeeded: () => {
      dispatch(settingAction.fetchSettingIfNeeded());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Master);
