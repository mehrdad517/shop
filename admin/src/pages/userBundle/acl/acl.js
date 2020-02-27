import React, {Component} from 'react';
import {connect} from 'react-redux';
import Api from "../../../api";
import {Checkbox, Snackbar, Tooltip} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoleCreate from "./role/create";
import {Link} from 'react-router-dom'
import {toast} from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import RolePermission from "./permission";
import IconButton from "@material-ui/core/IconButton";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Acl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dialog: false,
            role: null,
            roles: [],
        };

        this.api = new Api();
    }


    componentDidMount() {
        this.handleRequest();
    }

    handleRequest()
    {
        this.api.fetchRoles().then((response) => {
            if (typeof response != "undefined") {
                this.setState({
                    roles: response,
                    loading: false
                })
            }
        })

    }

    handleDialog(status)
    {

        if (this.state.role) {

            this.setState({
                dialog: status
            })
        } else {
            toast.info('هیچ نقشی انتخاب نکرده اید.');
        }
    }



    render() {
        return (
            <div className={'content'}>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0', borderRadius: '30px'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>مدیریت نقش ها و سطوح دسترسی</h2>
                                <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید سطوح دسترسی را مدیریت کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/users'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {this.props.auth.login && this.props.auth.permissions.role.store.access ?
                        <Tooltip title="سطح دسترسی">
                            <IconButton onClick={() => this.handleDialog(true)}>
                                <AccessibilityIcon />
                            </IconButton>
                        </Tooltip> : "" }
                        {this.props.auth.login && this.props.auth.permissions.role.store.access ? <RoleCreate handleRequest={() => this.handleRequest()} /> : ''}
                    </Box>
                    <Box className='animated fadeIn' boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px'}}>
                            <Grid container>
                                {this.state.roles && this.state.roles.map((role, i) => {
                                    return (
                                        <Grid  key={i} item xs={12} sm={3}>
                                            <FormControlLabel key={i} control={
                                                <Radio
                                                    checked={(this.state.role && this.state.role.key ? this.state.role.key : false ) === role.key}
                                                    value={role.key}
                                                    onChange={() => this.setState({ role: role })}
                                                />
                                            } label={role.title ? role.title : role.key} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        {this.state.loading ? <CircularProgress style={{ zIndex: 9999}} color={"secondary"} /> : ''}
                    </Box>
                </Container>
                <Dialog fullScreen TransitionComponent={Transition}  open={this.state.dialog}>
                    <RolePermission onClose={() => this.setState({ dialog: false})} role={this.state.role}  />
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Acl);
