import React, {Component} from 'react';
import Header from './../header';

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default MainLayout;
