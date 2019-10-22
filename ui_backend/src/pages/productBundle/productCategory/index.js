import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Box, CircularProgress, Snackbar, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";


import Container from "@material-ui/core/Container";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checked: [],
            expanded: [],
            entities : [],
            loading: false,
            snackbar: {
                open: false,
                msg: null
            }
        }
    }

    componentDidMount() {
        this.handleRequest();
    }


    async handleRequest() {
        let instance = new Api();

        instance.fetchProductCategories().then((response) => {
            this.setState({
                entities : response,
                loading: true
            });
        });
    }

    render() {

        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت محصولات</h2>
                                <p style={{ color: '#8e8e8e'}}>کلیه محصولات در این صفحه لیست شده اند.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" color="default" >
                                        بازگشت&nbsp;<NavigationIcon />
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <CheckboxTree
                            nodes={this.state.entities}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                    </Box>
                </Container>
                <Snackbar
                    autoHideDuration={4500}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.msg}
                    onClose={() => this.setState({snackbar:{open: false,msg: null}})}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ProductCategory);
