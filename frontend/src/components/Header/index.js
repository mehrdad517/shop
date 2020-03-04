import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Input, Paper, TextField, Grid, CircularProgress} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import {toast} from "react-toastify";
import Api from "../../api";
import './header.css'

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
      loading: false,
      open: false,
      username: [0, 9],
      code: [],
      token: '',
      sending: false,
      counter: 60
    }

  }

  componentDidMount() {

    for (let i = 0; i<= 8; i++) {
      if (i <= 4) {
        this[`code_${i}`] = React.createRef();
      }
      this[`username_${i}`] = React.createRef();
    }


  }


  handleChangeUsername(event, index, operator) {

    if (operator === 'username') {

      let username = this.state.username;

      if (typeof this[`username_${index + 1}`] != "undefined") {

        if (event.target.value.length === 1) {
          username[index + 2] = parseInt(event.target.value);

          this.setState({
            username
          });
        }

        let current = this[`username_${index + 1}`].current;
        current.removeAttribute("disabled");
        current.focus();

      } else {

        username[index + 2] = parseInt(event.target.value);

        this.setState({
          username,
          loading: true
        });

        new Api().login({mobile : this.state.username.join('')}).then((response) => {
          if (typeof response != "undefined") {
            if (response.status) {
              toast.success(response.msg);

              this.setState({
                sending: true,
                loading: false,
                token: response.token
              });

              let interval = setInterval(() => {
                this.setState({
                  counter: this.state.counter - 1
                });

                if (this.state.counter === 0) {
                  this.setState({
                    loading: false,
                    username: [0, 9],
                    code: [],
                    token: '',
                    sending: false,
                    counter: 60
                  });
                  clearInterval(interval);
                }
              }, 1000);

              this[`code_0`].current.focus();

            } else {
              this.setState({
                loading:false
              })
              toast.error(response.message);
            }
          }
        }).catch((error) => {
          toast.error(error);
        });

      }
    } else {

      let code = this.state.code;

      if (typeof this[`code_${index + 1}`] != "undefined") {

        if (event.target.value.length === 1) {
          code[index] = parseInt(event.target.value);

          this.setState({
            code
          });
        }

        let current = this[`code_${index + 1}`].current;
        current.disabled = false;
        current.focus();

      } else {

        code[index] = parseInt(event.target.value);
        this.setState({
          code,
          loading: true
        });

        new Api().verify({mobile: this.state.username.join(''), token: this.state.token, code: this.state.code.join('')}).then((response) => {
          if (typeof response != "undefined") {
            if (response.status) {
              toast.success(response.msg);

              this.setState({
                loading: false,
                open: false,
                username: [0, 9],
                code: [],
                token: '',
                sending: false,
                counter: 60
              });

              //update redux

            } else {
              toast.error(response.msg);
              this.setState({
                loading: false
              })
            }
          }
        }).catch((error) => {
          toast.error(error)
        });

      }
    }
  }



  render() {
    console.log(this.state);
    return (
      <Paper className="header">
        <Container>
          <Button onClick={() => { this.setState({ open : true});}} variant="outlined" color="primary">
            Slide in alert dialog
          </Button>
          <Dialog
            className="login-wrapper"
            open={this.state.open}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onEscapeKeyDown={() => this.setState({ open: false})}
            onBackdropClick={() => this.setState({ open: false})}
            onEntered={() => this[`username_0`].current.focus()}
          >
            <DialogTitle>
              {this.state.sending === true ? 'تایید حساب کاربری' : 'ورود به سایت'}
            </DialogTitle>
            <DialogContent>
              <form  className="login-form">
                {this.state.sending === false ?
                  <>
                    <TextField value={0} disabled={true} variant={"outlined"} />
                    <TextField value={9} disabled={true} variant={"outlined"} />
                    {[0,1,2,3,4,5,6,7,8].map((value, key) => {
                      let pattern;
                      if(key === 0) pattern = 1; else if (key === 1) pattern = 2; else pattern = 0;
                      return(<TextField
                          disabled={key === 0 ? false : true}
                          key={key}
                          placeholder={`${pattern}`}
                          variant={"outlined"}
                          value={typeof this.state.username[key + 2] != undefined && this.state.username[key + 2]}
                          inputRef={this[`username_${value}`]}
                          onChange={(event) => this.handleChangeUsername(event, key, 'username')}
                        />
                      );
                    })}
                  </> : <div className="verify-code">
                    {[0,1, 2,3,4].map((value, key) => {
                      return(<TextField
                          disabled={key === 0 ? false : true}
                          key={key}
                          placeholder={'*'}
                          variant={"outlined"}
                          value={this.state.code[key]}
                          inputRef={this[`code_${value}`]}
                          onChange={(event) => this.handleChangeUsername(event, key, 'code')}
                        />
                      );
                    })}
                  </div>}
              </form>
              {this.state.sending === true && this.state.counter > 0 && <div className="login-form-msg">
                <Typography variant={"button"}><span>کد فعال سازی به شماره</span>&nbsp;<b>{this.state.username.join('')}</b>&nbsp;<span>ارسال شد.</span></Typography><br/><Typography variant={"button"}>{this.state.counter}</Typography>
              </div>}
              {this.state.loading && <CircularProgress color={"secondary"} size={15} />}
            </DialogContent>
          </Dialog>
        </Container>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
)(Header);