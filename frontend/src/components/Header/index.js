import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Input, Paper, TextField, Grid} from "@material-ui/core";
import style from './header.scss'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

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
      open: false,
      username: [0, 9],
      code: [],
      verify: false,
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

        this[`username_${index + 1}`].current.disabled = false;
        this[`username_${index + 1}`].current.focus();

        username.push(parseInt(event.target.value));

      } else {

        username.push(parseInt(event.target.value));
        // send request and show verify modal
        this.setState({
          sending: true,
          username
        });

        let interval = setInterval(() => {
          this.setState({
            counter: this.state.counter - 1
          });

          if (this.state.counter === 0) {
            this.setState({
              username: [0, 9],
              code: [],
              verify: false,
              sending: false,
              counter: 60
            });
            clearInterval(interval);
          }
        }, 1000)


        // send to api
      }
    } else {

      let code = this.state.code;

      if (typeof this[`code_${index + 1}`] != "undefined") {

        this[`code_${index + 1}`].current.disabled = false;
        this[`code_${index + 1}`].current.focus();

        code.push(parseInt(event.target.value));

      } else {
        code.push(parseInt(event.target.value)); // last record
        // send request and show verify modal
        this.setState({
          verify: true,
          open: false,
          code
        });


        // send to api
      }
    }
  }



  render() {
    console.log(this.state);
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
            >
              <div className={style.wrapper}>
              <DialogTitle style={{ textAlign: "center"}}>
                {this.state.sending === true ? 'تایید حساب کاربری' : 'ورود به سایت'}
              </DialogTitle>
              <DialogContent>
                <div className={style.login}>
                  {this.state.sending === false ?
                    <>
                    <TextField value={0} disabled={true} variant={"outlined"} />
                    <TextField value={9} disabled={true} variant={"outlined"} />
                    {[0,1,2,3,4,5,6,7,8].map((value, key) => {
                      let pattern;
                      if(key === 0) pattern = 1; else if (key === 1) pattern = 2; else pattern = 0;
                      return(<TextField
                          disabled={key === 0 ? false : true} key={key}
                          placeholder={`${pattern}`}
                          variant={"outlined"}
                          inputRef={this[`username_${value}`]}
                          onChange={(event) => this.handleChangeUsername(event, key, 'username')}
                        />
                      );
                    })}
                  </> : <>
                    {[0,1, 2,3,4].map((value, key) => {
                      return(<TextField
                          disabled={key === 0 ? false : true}
                          key={key}
                          placeholder={'*'}
                          variant={"outlined"}
                          inputRef={this[`code_${value}`]}
                          onChange={(event) => this.handleChangeUsername(event, key, 'code')}
                        />
                      );
                    })}
                  </>}
                </div>
                {this.state.sending === true && this.state.counter > 0 && <Typography variant={"p"}>{ 'کد دریافتی را وارد نمایید' + ' (' + this.state.counter + ')'}</Typography>}
              </DialogContent>
              </div>
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
