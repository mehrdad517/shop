import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Box, CircularProgress, Snackbar, Tooltip} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from '@material-ui/icons/Sync';
import BlogCategoryCreate from "./create";
import Dialog from "@material-ui/core/Dialog";
import BlogCategoryEdit from "./edit";
import EditIcon from "@material-ui/icons/Edit";
import BlogCategoryHead from "./head";
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
import {toast} from "react-toastify";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

class BlogCategory extends Component {

    constructor(props) {
        super(props);
        this.state= {
            checked: [], // tree checked or edit or  show
            expanded: [], // expanded tree
            categories : [], // categories tree
            loading: false, // page loading
            dialog:false, // dialog open
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
            resolve(instance.getBlogCategories().then((response) => {
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

    expandScrolling(expanded, categories){

        categories.map((category) => {
            expanded.push(category.value);
            this.expandScrolling(expanded,category.children);

        });

        return expanded;
    }

    handleToggleExpand()
    {
        let expanded = [];

        if (this.state.expanded.length === 0) {

            expanded = this.expandScrolling(expanded,this.state.categories)

        }

        this.setState({
            expanded
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='content'>
                <Container>
                    <BlogCategoryHead />
                    {!this.state.loading ? <CircularProgress color={"secondary"} /> : <div>
                        <Box>
                            <div style={{ display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
                                {Boolean(this.props.auth.permissions.blog_category.store.access) && <BlogCategoryCreate handleRequest={this.handleRequest.bind(this)}  items={this.state.checked} />}
                                {Boolean(this.props.auth.permissions.blog_category.update.access) && <Tooltip title="ویرایش">
                                    <IconButton  onClick={() => (this.state.checked.length === 0 || this.state.checked.length > 1) ? toast.info('یگ گزینه را انتخاب نمایید.') : this.props.history.push('/blog/categories/' + this.state.checked[0]) }>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>}
                                <Tooltip title="باز و بسته کردن">
                                    <IconButton onClick={this.handleToggleExpand.bind(this)}>
                                        <AspectRatioIcon />
                                    </IconButton>
                                </Tooltip>
                                {Boolean(this.props.auth.permissions.blog_category.index.access) && <Tooltip title="سینک">
                                    <IconButton onClick={() => this.handleRequest()} >
                                        <SyncIcon />
                                    </IconButton>
                                </Tooltip>}
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
                            {this.state.checked.length > 0 && <BlogCategoryEdit entity={this.state.checked[0]}  handleRequest={() => this.handleRequest()} onClose={() => this.setState({dialog: false})} />}
                        </Dialog>
                    </div>}
                </Container>
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
)(BlogCategory);
