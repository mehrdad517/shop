import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "../header";
import {CircularProgress} from "@material-ui/core";

class MainLayout extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {this.props.auth.login ? <Header /> : ''}
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
)(MainLayout);

