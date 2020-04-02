import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { settingAction } from '../../actions';
import { Footer, Header } from '../index';

class Master extends PureComponent {
  componentDidMount() {
    const { fetchSettingIfNeeded } = this.props;
    fetchSettingIfNeeded();
  }

  render() {
    return (
      <div>
        {this.props.setting.readyStatus === 'success' && <Header setting={this.props.setting} />}
        <div style={{ minHeight: '500px'}}>{this.props.children}</div>
        {this.props.setting.readyStatus === 'success' && <Footer setting={this.props.setting} />}
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
