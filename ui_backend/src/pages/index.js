import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../api";
import Header from "./header";
import {CircularProgress} from "@material-ui/core";

class Index extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
        };

        this.api = new Api();
    }


    componentDidMount() {

    let interval = setInterval(() => {
        if (this.props.auth.login) {
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
    return{}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);
