import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Input, Paper, TextField} from "@material-ui/core";
import style from './header.scss'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function mapStateToProps(state) {
  return {};
}

class Header extends Component {


  constructor(props) {
    super(props);
    this.state = {
      open : false,
    }
  }

  componentDidMount() {

    for (let i = 0; i<= 10; i++) {
      this[`username_${i}`] = React.createRef();
    }

  }


  handleChangeUsername(event, index) {

    if (typeof this[`username_${index + 1}`] != "undefined") {
      this[`username_${index + 1}`].current.disabled = false;
      this[`username_${index + 1}`].current.focus();
    } else {
      // send request and show verify modal
    console.log('xxxx')
  }

  }


  render() {
    return (
      <div>
        <Paper className={style.header}>
          <Container>
            <Button onClick={() =>this.setState({ open : true})} variant="outlined" color="primary">
              Slide in alert dialog
            </Button>
            <Dialog
              fullWidth={true}
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"ثبت نام"}</DialogTitle>
              <DialogContent>
                <div className={style.login}>
                  {[0,1,2,3,4,5,6,7,8,9, 10].map((value, key) => {
                    let pattern;
                    if (key === 0) pattern = 0; else if (key === 1) pattern = 9; else if(key === 2) pattern = 1; else if (key === 3) pattern = 2; else pattern = 0;
                    return(<TextField disabled={key === 0 ? false : true} key={key} placeholder={`${pattern}`} variant={"outlined"}  inputRef={this[`username_${key}`]} onChange={(event) => this.handleChangeUsername(event, key)} />);
                  })}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() =>this.setState({ open : false})} color="primary">
                  Disagree
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Paper>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Header);
