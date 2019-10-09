import React, {Component} from 'react';
import {connect} from 'react-redux';
import Table from "../components/table/table";

class Product extends Component {
    render() {
        return (
            <div>
                <Table/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Product);
