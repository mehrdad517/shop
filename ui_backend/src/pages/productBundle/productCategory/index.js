import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Box, Checkbox, CircularProgress, Snackbar, Tooltip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";


import Container from "@material-ui/core/Container";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from '@material-ui/icons/Sync';
import ProductCategoryCreate from "./create";
import Dialog from "@material-ui/core/Dialog";
import ProductCategoryEdit from "./edit";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";


class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checked: [],
            expanded: [],
            entities : [],
            attributes: [],
            loading: false,
            dialog:false,
            snackbar: {
                open: false,
                msg: null
            }
        }
    }

    componentDidMount() {
        this.handleRequest();
    }

    handleSnackbar(parameter) {
        this.setState({
            snackbar:{
                open: parameter.open,
                msg: parameter.msg
            }
        })
    }


    async handleRequest() {
        let instance = new Api();

        instance.fetchProductCategories().then((response) => {
            this.setState({
                entities : response,
                loading: true
            });
        });

        instance.fetchAttributes().then((response) => {
            this.setState({
                attributes: response
            })
        }).catch((error) => {
            console.log(error);
        })
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
                                <h2>دسته بندی محصولات</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید محصولات را دسته بندی کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/products'>
                                    <Button variant="contained" color="default" >
                                        <NavigationIcon />
                                    </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <div style={{ display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
                            <ProductCategoryCreate handleRequest={this.handleRequest.bind(this)} handleSnackbar={this.handleSnackbar.bind(this)} items={this.state.checked} />
                            <Tooltip title="ویرایش">
                                <IconButton onClick={() => this.state.checked.length === 1 ?  this.setState({ dialog: true}) : this.setState({snackbar:{open: true, msg: 'یگ گزینه را انتخاب نمایید.'}}) }>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="سینک">
                                <IconButton onClick={() => this.handleRequest()} >
                                    <SyncIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Box>
                    <Box style={{ margin: '20px 0'}} boxShadow={0}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography><b style={{ marginRight: '10px' }}>تعیین ویژگی گروهی</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container spacing={2}>
                                    {this.state.attributes.map(function (attr, index) {
                                        return(
                                            <Grid key={index}  item sm={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            key={index}
                                                        />
                                                    }
                                                    label={attr.title}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button color="primary">
                                    ثبت اطلاعات
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Box>
                    <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        { this.state.entities.length > 0 ?  <CheckboxTree
                            nodes={this.state.entities}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                            noCascade={true}
                        /> : <p>دسته جدید ایجاد نمایید.</p> }
                    </Box>
                </Container>
                <Dialog open={this.state.dialog}  onClose={() => this.setState({dialog: false})}>
                    <ProductCategoryEdit entity={this.state.checked}  handleRequest={() => this.handleRequest()} handleSnackbar={this.handleSnackbar.bind(this)} onClose={() => this.setState({dialog: false})} />
                </Dialog>
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
