import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "../header";

class MainLayout extends Component {
    render() {
        return (
            <div>
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

