import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "../header";

class MainLayout extends Component {

    componentDidMount() {
        if (!this.props.auth.login) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                {this.props.auth && this.props.auth.login ? <div>
                    <Header />
                    {this.props.children}
                </div>: ''}

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

