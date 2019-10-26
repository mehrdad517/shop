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
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ProductCategoryHead from "./head";
import TextField from "@material-ui/core/TextField";
import AttributeCreate from "../GroupAttribute/create";
import AttributeEdit from "../GroupAttribute/edit";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class ProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state= {
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            attributes: [], // attr for category
            attribute: null, // for edit or show
            loading: false, // page loading
            dialog:false, // dialog open
            snackbar: { // toaster
                open: false,
                msg: null
            },
            checkedItems: new Map(), // checkbox attributes
            filter: {} // filter attribute
        }
    }

    // handle snackbar for show error or notification
    handleSnackbar(parameter) {
        this.setState({
            snackbar:{
                open: parameter.open,
                msg: parameter.msg
            }
        })
    }

    // call when component loaded
    componentDidMount() {
        this.handleRequest();
    }

    // request handle
    async handleRequest() {
        let instance = new Api();

        await new Promise((resolve => {
            resolve(instance.fetchAttributes({filter: this.state.filter}).then((response) => {
                if (typeof response != "undefined") {
                    response.forEach((key, value) => {
                        this.setState(prevState => ({checkedItems: prevState.checkedItems.set(key.id, false)}));
                    });
                    this.setState({
                        attributes: response
                    })
                }
            }).catch((error) => {
                console.log(error);
            }));
        }));

        await new Promise((resolve => {
            resolve(instance.fetchProductCategories().then((response) => {
                if (typeof response != "undefined") {
                    this.setState({
                        categories : response,
                    });
                }
            }))
        }));

        await new Promise((resolve) => {
            resolve(this.setState({
                loading: true
            }));
        })
    }

    // search attr
    async handleChangeAttributeSearchInput(event) {
        let filter = this.state.filter;
        filter[event.target.name] = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                filter,
            }));
        }));

        this.handleRequest();

    }

    // change attr and change checkedItems for edit form
    handleChangeAttr(event) {

        this.setState({
           attribute: event.target.value
        });

        let val = parseInt(event.target.value);
        if (event.target.checked) {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, true)}));
        } else {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(val, false)}));
        }
    }

    // handle submit for change attr of categories
    handleSubmit(event) {
        event.preventDefault();
        let instance = new Api();
        let attr = [];
        let i = 0;
        this.state.checkedItems.forEach((key, value) => {
            if (key) {
                attr[i] = value;
                i++;
            }
        });
        if (this.state.checked.length > 0) {
            this.setState({
                loading: false,
            });

            instance.storeProductCategory({
                categories: this.state.checked,
                attributes: attr
            }).then((response) => {
                this.setState({
                    loading: true,
                    snackbar: {
                        open: true,
                        msg: response.msg
                    }
                })
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    // change category and select attrubites
    handleChangeCategoryAndSelectAttr(checked) {

        this.state.checkedItems.forEach((key, value) => {
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(value, false)}));
        });

        this.setState({
            checked,
        });

        if (checked.length > 0) {
            let instance = new Api();
            instance.getProductCategoryAttributes(checked).then((response) => {
                response.forEach((key, value) => {
                    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(key.id, true)}));
                });
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    getCheckedItemFromMapCounter() {
        let counter = 0;
        this.state.checkedItems.forEach( (key, value) => {
            if (this.state.checkedItems.get(value) === true) {
                counter++;
            }
        });

        return counter;
    }

    attributeEditProvider() {
        this.state.checkedItems.forEach( (key, value) => {
            if (this.state.checkedItems.get(value) === true) {
                this.setState({
                    attribute: value,
                    dialog: true
                })
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <ProductCategoryHead />
                    <Box style={{ margin: '20px 0'}} boxShadow={0}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography><b>جستجو در ویژگیها</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3} >
                                        <TextField
                                            id="outlined-name"
                                            label="عنوان"
                                            variant="filled"
                                            margin='dense'
                                            fullWidth
                                            name='title'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeAttributeSearchInput.bind(this)}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button color="primary">
                                    جستجو
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <AttributeCreate handleRequest={this.handleRequest.bind(this)} handleSnackbar={this.handleSnackbar.bind(this)} />
                        <Tooltip title="ویرایش">
                            <IconButton onClick={() => this.getCheckedItemFromMapCounter() === 1 ?  this.attributeEditProvider() : this.setState({snackbar:{open: true, msg: 'یگ گزینه را انتخاب نمایید.'}}) }>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="سینک">
                            <IconButton onClick={() => this.handleRequest()} >
                                <SyncIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box style={{ margin: '20px 0'}} boxShadow={0}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography><b style={{ marginRight: '10px' }}>تعیین ویژگیها</b></Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <ExpansionPanelDetails >
                                    <Grid container spacing={2}>
                                        {this.state.attributes && this.state.attributes.map((attr, index) => {
                                            return(
                                                <Grid key={index}  item sm={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={attr.id}
                                                                checked={this.state.checkedItems.get(attr.id)}
                                                                onChange={this.handleChangeAttr.bind(this)}
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
                                    <Button type='submit' color="primary">
                                        ثبت اطلاعات
                                    </Button>
                                </ExpansionPanelActions>
                            </form>
                        </ExpansionPanel>
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
                    <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        { this.state.categories.length > 0 ?  <CheckboxTree
                            nodes={this.state.categories}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.handleChangeCategoryAndSelectAttr(checked)}
                            onExpand={expanded => this.setState({ expanded })}
                            noCascade={true}
                        /> : <p>دسته جدید ایجاد نمایید.</p> }
                    </Box>
                </Container>
                <Dialog open={this.state.dialog}  onClose={() => this.setState({dialog: false})}>
                    {this.state.attribute ? <AttributeEdit entity={this.state.attribute}  handleRequest={() => this.handleRequest()} onClose={() => this.setState({dialog: false})} /> : ''}
                    {this.state.checked.length > 0 ? <ProductCategoryEdit entity={this.state.checked[0]}  handleRequest={() => this.handleRequest()} handleSnackbar={this.handleSnackbar.bind(this)} onClose={() => this.setState({dialog: false})} /> : ''}
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
