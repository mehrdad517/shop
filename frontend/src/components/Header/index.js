import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Input,
  Paper,
  TextField,
  Grid,
  CircularProgress
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import './header.css';
import Drawer from '@material-ui/core/Drawer';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import {Search, Sidebar} from '../index';
import Api from '../../api';
import {AUTH_LOGIN, AUTH_LOGOUT} from "../../types";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from "@material-ui/core/Fade";
import Cookies from "universal-cookie/lib";
import validator from 'validator';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
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
      counter: 60,
      // drawer
      right: false,
      // menu
      anchorEl: null,
      logout: false,
    };
  }

  componentDidMount() {
    for (let i = 0; i <= 8; i++) {
      if (i <= 4) {
        this[`code_${i}`] = React.createRef();
      }
      this[`username_${i}`] = React.createRef();
    }
  }

  handleChangeUsername(event, index, operator) {

    if (operator === 'username') {

      const { username } = this.state;

      if (validator.isNumeric(event.target.value) && event.target.value.length === 1) {
        if (typeof this[`username_${index + 1}`] !== 'undefined') {

          if (event.target.value.length === 1) {
            username[index + 2] = parseInt(event.target.value);

            this.setState({
              username
            });
          }

          const { current } = this[`username_${index + 1}`];
          current.removeAttribute('disabled');
          current.focus();
        } else {
          username[index + 2] = parseInt(event.target.value);

          this.setState({
            username,
            loading: true
          });

          new Api()
            .login({ mobile: this.state.username.join('') })
            .then(response => {
              if (typeof response !== 'undefined') {
                if (response.status) {
                  toast.success(response.msg);

                  this.setState({
                    sending: true,
                    loading: false,
                    token: response.token
                  });

                  const interval = setInterval(() => {
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

                  this.code_0.current.focus();

                } else {
                  this.setState({
                    loading: false
                  });
                  toast.error(response.msg);
                }
              }
            })
            .catch(error => {
              toast.error(error);
            });
        }
      } else {
        const { current } = this[`username_${index}`];
        current.value = '';
        current.focus()
      }
    } else {

      const { code } = this.state;

      if (validator.isNumeric(event.target.value) && event.target.value.length === 1) {

        if (typeof this[`code_${index + 1}`] !== 'undefined') {
          if (event.target.value.length === 1) {
            code[index] = parseInt(event.target.value);

            this.setState({
              code
            });
          }

          const { current } = this[`code_${index + 1}`];
          current.disabled = false;
          current.focus();
        } else {

          code[index] = parseInt(event.target.value);

          this.setState({
            code,
            loading: true
          });

          new Api().verify({
            mobile: this.state.username.join(''),
            token: this.state.token,
            code: this.state.code.join('')
          }).then(response => {
            if (typeof response !== 'undefined') {
              if (response.status) {

                this.props.dispatch({type: AUTH_LOGIN, payload: response.result});

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

              } else {
                toast.error(response.msg);
                this.setState({
                  loading: false
                });
              }
            }
          })
            .catch(error => {
              toast.error(error);
            });
        }
      } else {
        const { current } = this[`code_${index}`];
        current.value = '';
        current.focus()
      }
    }

  }


  render() {
    return (
      <>
        <div className="Header">
          <div className="Header-top">
            <Container>
              <Grid container={true}>
                <Grid item lg={6} md={6} sm={6} xs={4}>
                  <div className="Header-top-right">
                    <div className="HeadMenu">
                      <div className="Menu">
                        <div className="Menubtn" onClick={() => {
                          this.setState({ right: true });
                        }}>
                          <span>منوی سایت</span>
                          <img src={require('../../static/Img/Group 200.png')}/>
                        </div>
                      </div>
                    </div>
                    <div className="Header-top-right-search">
                      <Search />
                    </div>
                    <div className="HeadLogo">
                      <Link to={'/'}>
                        <img style={{ height: '45px'}} src={require('../../static/Img/9760b8af.svg')} />
                      </Link>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={8}>
                  <div className="HeadProfile">
                    <Button
                      startIcon={<PermIdentityIcon />}
                      onClick={(event) => {
                        if (this.props.auth.login) {
                          this.setState({
                            anchorEl : event.currentTarget
                          })
                        } else {
                          this.setState({ open: true });
                        }
                      }}
                      variant="text"
                      color="default"
                    >
                      {this.props.auth.login ? (this.props.auth.data.user.name ? this.props.auth.data.user.name : this.props.auth.data.user.mobile) : 'ورود/عضویت'}
                    </Button>
                    <Menu
                      id="fade-menu"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={() => this.setState({anchorEl: null})}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => this.setState({anchorEl: null})}><Typography>سفارشات</Typography></MenuItem>
                      <MenuItem onClick={() => this.setState({anchorEl: null})}><Typography>ویرایش پروفایل</Typography></MenuItem>
                      <MenuItem onClick={() => this.setState({anchorEl: null})}><Typography>تغییر رمز</Typography></MenuItem>
                      <MenuItem onClick={() => {this.setState({ logout: true, anchorEl: null})} }>
                        <Typography>خروج از سایت</Typography>
                      </MenuItem>
                    </Menu>
                    <IconButton>
                      <Badge
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        color="secondary"
                        overlap="circle"
                        badgeContent="0"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <Drawer
          anchor="left"
          open={this.state.right}
          onEscapeKeyDown={() => this.setState({ right: false })}
          onBackdropClick={() => this.setState({ right: false })}
        >
          <Sidebar onClose={() => this.setState({ right: false })} setting={this.props.setting.data} />
        </Drawer>
        <Dialog
          className="login-wrapper"
          open={this.state.open}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onEscapeKeyDown={() => this.setState({ open: false })}
          onBackdropClick={() => this.setState({ open: false })}
          onEntered={() => this.username_0.current.focus()}
        >
          <DialogTitle>
            {this.state.sending === true
              ? 'تایید حساب کاربری'
              : 'ورود به سایت'}
          </DialogTitle>
          <DialogContent>
            <form className="login-form">
              {this.state.sending === false ? (
                <>
                  <TextField value={0} disabled variant="outlined" />
                  <TextField value={9} disabled variant="outlined" />
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value, key) => {
                    let pattern;
                    if (key === 0) pattern = 1;
                    else if (key === 1) pattern = 2;
                    else pattern = 0;
                    return (
                      <TextField
                        disabled={key !== 0}
                        key={key}
                        placeholder={`${pattern}`}
                        variant="outlined"
                        inputRef={this[`username_${value}`]}
                        onChange={event =>
                          this.handleChangeUsername(event, key, 'username')
                        }
                      />
                    );
                  })}
                </>
              ) : (
                <div className="verify-code">
                  {[0, 1, 2, 3, 4].map((value, key) => {
                    return (
                      <TextField
                        disabled={key !== 0}
                        key={key}
                        placeholder="*"
                        variant="outlined"
                        inputRef={this[`code_${value}`]}
                        onChange={event =>
                          this.handleChangeUsername(event, key, 'code')
                        }
                      />
                    );
                  })}
                </div>
              )}
            </form>
            {this.state.sending === true && this.state.counter > 0 && (
              <div className="login-form-msg">
                <Typography variant="button">
                  <span>کد فعال سازی به شماره</span>&nbsp;
                  <b>{this.state.username.join('')}</b>&nbsp;
                  <span>ارسال شد.</span>
                </Typography>
                <br />
                <Typography variant="button">
                  {this.state.counter}
                </Typography>
              </div>
            )}
            {this.state.loading && (
              <CircularProgress color="secondary" size={15} />
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          open={this.state.logout}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ logout: false})}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">آیا برای خروج مطمئن هستید؟</DialogTitle>
          <DialogContent>
            <div style={{ display: this.state.loading ? 'flex' : 'none', justifyContent: "center"}}>
              <CircularProgress size={18} color={"secondary"} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ logout: false, loading: false})} color="primary">
              خیر
            </Button>
            <Button onClick={() => {
              this.setState({
                loading: true
              });
              new Api().logout().then((response) => {
                if (typeof response != "undefined") {
                  if (response.status) {
                    toast.success('با موفقیت از سایت خارج شدید.');
                    const cookies = new Cookies();
                    cookies.remove('auth');
                    this.props.dispatch({type: AUTH_LOGOUT});
                  }
                  this.setState({
                    logout: false,
                    loading: false
                  });
                }
              }).then((error) => {
                toast.error(error)
              })
            }} color="primary">
              بله خارج میشوم
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect(mapStateToProps)(Header);
