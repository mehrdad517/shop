import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authPermissions} from "../actions/auth";

class Main extends Component {

    componentDidMount() {
        this.props.authPermissions();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return{
        authPermissions : function () {
            dispatch(authPermissions('super_admin'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);
