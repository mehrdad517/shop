import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authPermissions} from "../actions/auth";

class Index extends Component {


    componentDidMount() {
        if (this.props.auth.user) {
            this.props.authPermissions(this.props.auth.user.role_key);
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return{
        authPermissions : function (role) {
            dispatch(authPermissions(role))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);
