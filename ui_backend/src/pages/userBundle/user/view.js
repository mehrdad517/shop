import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import {Tooltip} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class UserView extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            open: false
        }
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <Tooltip title="مشاهده">
                <IconButton  aria-label="delete" onClick={this.handleClickOpen.bind(this)}>
                    <ViewColumnIcon />
                </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">مشاهده اطلاعات کاربر</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <ListItem role={undefined} dense button>
                                <ListItemIcon>
                                    dfsdfds
                                </ListItemIcon>
                                <ListItemText  />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">
                                        dsfdsf
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Disagree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(UserView);
