import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authPermissions, AuthSetting} from "../actions/auth";
import Api from "../api";
import {AUTH_CHANGE_LOGIN} from "../actionTypes";
import Header from "./header";
import {CircularProgress} from "@material-ui/core";
import MainLayout from "./layout/main";

class Index extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
        };

        this.api = new Api();
    }


    componentDidMount() {

        // call setting record
        this.props.authSetting(window.location.host);

        if (this.props.auth.user) {
            this.props.authPermissions(this.props.auth.user.role_key);
        }

        let interval = setInterval(() => {
            if (this.props.auth.permissions) {
                this.setState({
                    loading: false
                });
                clearInterval(interval);
            }
        }, 100);

    }

    render() {
        if (this.state.loading) {
            return <CircularProgress color={"secondary"} />
        }
        return (
            <div>
                <Header />
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
        },
        authSetting: function (domain) {
            dispatch(AuthSetting(domain));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);
