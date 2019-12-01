import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Snackbar, Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from 'react-router-dom'
import AttributeCreate from "./create";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import AttributeEdit from "./edit";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Pagination from "react-js-pagination";

class GroupAttributeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: [],
            entity: null,
            page: 1,
            dialog: false,
            loading: false,
            filter: {},
            snackbar: {open: false, msg: null}
        };
        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleChangeSearchInput(event) {
        let filter = this.state.filter;
        filter[event.target.name] = event.target.value;
        await new Promise((resolve => {
            resolve(this.setState({
                filter,
                page: 1,
                // loading: false,
            }));
        }));

        this.handleRequest();

    }

    async handlePageChange(page) {

        await new Promise((resolve => {
            resolve(this.setState({
                page: page
            }));
        }));

        await this.handleRequest()
    }

    handleRequest() {
        this.api.fetchAttributes({filter: this.state.filter, page: this.state.page}).then((response) => {
            this.setState({
                entities: response,
                loading: true,
                snackbar: {
                    open: true,
                    msg: 'لیست بارگزاری شد.'
                }
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleSnackbar(parameter) {
        this.setState({
            snackbar:{
                open: parameter.open,
                msg: parameter.msg
            }
        })
    }


    render() {
        if (this.state.loading === false) {
            return(<CircularProgress color={"secondary"} />);
        }
        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>ویژگی گروهی</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید به صورت گروهی ویژگی تعریف کنید.</p>
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
                    <Box style={{ margin: '20px 0'}} boxShadow={0}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div>
                                    <Typography>جستجو در لیست</Typography>
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
                                            onChange={this.handleChangeSearchInput.bind(this)}
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
                            {this.state.entity ? <Link to={`/products/attributes/${this.state.entity}`}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Link> : <IconButton onClick={() => this.state.entity ?  this.setState({ dialog: true}) : this.setState({snackbar:{open: true, msg: 'یگ گزینه را انتخاب نمایید.'}}) }>
                                <EditIcon />
                            </IconButton>}
                        </Tooltip>
                    </Box>
                    <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <Grid container>
                            {this.state.entities.data.map((entity, index) => {
                                return(
                                    <Grid key={index} item xs={6} sm={3}>
                                        <FormControlLabel  control={
                                            <Radio
                                                checked={this.state.entity === entity.id}
                                                onChange={() => this.setState({ entity: entity.id})}
                                                name='attribues'
                                            />
                                        } label={entity.title} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={this.state.entities.per_page}
                        totalItemsCount={this.state.entities.total}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </Container>
                <Dialog open={this.state.dialog}  onClose={() => this.setState({dialog: false})}>
                    <AttributeEdit entity={this.state.entity}  handleRequest={() => this.handleRequest()} onClose={() => this.setState({dialog: false})} />
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

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupAttributeList);
