import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "../header";
import {CircularProgress} from "@material-ui/core";

class MainLayout extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        if (!this.props.auth.login) {
            this.props.history.push('/')
        }
    }





    render() {
        return (
            <div className="animated fadeIn">
                <Header />
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

