import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from 'react-router-dom'
import PackageTypeCreate from "./create";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import PackageTypeEdit from "./edit";
import {toast} from "react-toastify";
import Api from "../../../api";

class PackageType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: [],
            entity: null,
            dialog: false,
            loading: true,
        };
        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }


    handleRequest() {
        this.api.fetchPackageTypes().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    entities: response,
                    loading: false,
                });
            }

        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>واحد های اندازه گیری</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید واحد های اندازه گیری را تعریف کنید.</p>
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
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {Boolean(this.props.auth.permissions.product_package_type.store.access) && <PackageTypeCreate handleRequest={this.handleRequest.bind(this)}  />}
                        {Boolean(this.props.auth.permissions.product_package_type.update.access) &&
                        <Tooltip title="ویرایش">
                            <IconButton onClick={() => this.state.entity ? this.setState({ dialog: true }) : toast.info('یک گزینه انتخاب کنید')}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        }
                    </Box>
                    <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                        <Grid container>
                            {this.state.entities.data && this.state.entities.data.map((entity, index) => {
                                return(
                                    <Grid key={index} item xs={6} sm={3}>
                                        <FormControlLabel  control={
                                            <Radio
                                                checked={this.state.entity === entity.id}
                                                onChange={() => this.setState({ entity: entity.id})}
                                            />
                                        } label={entity.title} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                    {this.state.loading && <CircularProgress color={"secondary"} />}
                </Container>
                <Dialog open={this.state.dialog}  onClose={() => this.setState({dialog: false})}>
                    <PackageTypeEdit entity={this.state.entity}  handleRequest={() => this.handleRequest()} onClose={() => this.setState({dialog: false})} />
                </Dialog>
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
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageType);
