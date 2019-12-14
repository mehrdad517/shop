import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Box, CircularProgress, Snackbar, Tooltip} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from '@material-ui/icons/Sync';
import ProductCategoryCreate from "./create";
import Dialog from "@material-ui/core/Dialog";
import ProductCategoryEdit from "./edit";
import EditIcon from "@material-ui/icons/Edit";
import ProductCategoryHead from "./head";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';

class ProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state= {
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            loading: false, // page loading
            dialog:false, // dialog open
            snackbar: { // toaster
                open: false,
                msg: null
            },
        }
    }

    // call when component loaded
    componentDidMount() {
        this.handleRequest();
    }

    // request handle
    async handleRequest() {
        let instance = new Api();
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

    // handle snackbar for show error or notification
    handleSnackbar(parameter) {
        this.setState({
            snackbar:{
                open: parameter.open,
                msg: parameter.msg
            }
        })
    }

    render() {
        console.log('xxx');
        return (
            <div className='content'>
                <Container>
                    <ProductCategoryHead />
                    {!this.state.loading ? <CircularProgress color={"secondary"} /> : <div>
                        <Box>
                            <div style={{ display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
                                <Tooltip title="افزودن ویژگی">
                                    {this.state.checked.length === 1 ? <Link to={`/categories/${this.state.checked[0]}/attributes`}>
                                        <IconButton>
                                            <ScatterPlotIcon />
                                        </IconButton>
                                    </Link> : <IconButton onClick={() => this.state.checked.length === 1 ?  '' : this.setState({snackbar:{open: true, msg: 'یگ گزینه را انتخاب نمایید.'}}) }>
                                        <ScatterPlotIcon />
                                    </IconButton>}
                                </Tooltip>
                                <ProductCategoryCreate handleRequest={this.handleRequest.bind(this)}  items={this.state.checked} />
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
                                onCheck={checked => this.setState({checked})}
                                onExpand={expanded => this.setState({ expanded })}
                                noCascade={true}
                                icons={{
                                    check: <CheckBoxIcon />,
                                    uncheck: <CheckBoxOutlineBlankIcon />,
                                    expandClose: <ExpandLessIcon />,
                                    expandOpen: <ExpandMoreIcon />,
                                    parentClose: <FolderIcon />,
                                    parentOpen: <FolderOpenIcon />,
                                    leaf: <InsertDriveFileIcon />,
                                }}
                            /> : <p>دسته جدید ایجاد نمایید.</p> }
                        </Box>
                        <Dialog open={this.state.dialog}  onClose={() => this.setState({dialog: false})}>
                            {this.state.checked.length > 0 ? <ProductCategoryEdit entity={this.state.checked[0]}  handleRequest={() => this.handleRequest()} handleSnackbar={this.handleSnackbar.bind(this)} onClose={() => this.setState({dialog: false})} /> : ''}
                        </Dialog>
                        <Snackbar
                            autoHideDuration={4500}
                            open={this.state.snackbar.open}
                            message={this.state.snackbar.msg}
                            onClose={() => this.setState({snackbar:{open: false,msg: null}})}
                        />
                    </div>}
                </Container>
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
