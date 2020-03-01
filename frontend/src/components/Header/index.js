import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import StyleWrapper from './header.style';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenue: 'none',
      password: 'none',
      LoginModal: 'flex',
      phone: '',
      enterphone: 'none',
      allpassword: [],
      logintoggle: 'none',
      togglemenu: 'none',
      security: false

    }
    this.allpassword = []
  }

  componentDidMount() {
    let Login = document.querySelector('.Login')
    window.addEventListener('click', (event) => {
      if (event.target === Login) {
        this.setState({
          logintoggle: 'none'
        })
      }
    })
    // window.addEventListener('scroll', () => {
    //     if (document.documentElement.scrollTop > 600) {
    //         this.hideHeader()
    //     }
    //     if (document.documentElement.scrollTop < 500) {
    //         this.showHeader()
    //     }
    // })
  }

  hideHeader() {
    let headertoggle = document.querySelector('.HeaderTop')
    headertoggle.style.top = -150 + 'px'
  }

  showHeader() {
    let headertoggle = document.querySelector('.HeaderTop')
    headertoggle.style.top = 0 + 'px'
  }

  nextinput(index) {
    this[`input${index + 1}`].current.focus()
  }

  handlephone(newvalue) {
    this.setState({
      phone: newvalue.target.value
    })
  }

  toggleMenue() {
    this.props.dispatch(toggleMenue('flex'))
    this.toggleMenuetree.current.toggleMenuetree() && this.toggleMenuetree.current.toggleMenuetree()
  }

  validation() {
    if (this.state.phone === '') {
      this.setState({
        enterphone: 'flex'
      })
      return false
    }
    return true
  }

  validationpassworld() {
    this.setState({security: true})
    alert('login')
  }

  gonext() {
    if (this.validation()) {
      this.setState({password: 'flex', LoginModal: 'none'})
    }
  }

  password(value, index) {
    this.allpassword[index] = value.target.value
    this.setState({
      allpassword: this.allpassword
    })
    let check = this.state.allpassword.filter((item) => {
      return item !== ''
    })
    if (check.length === 5 && this.state.security === false) {
      this.validationpassworld()
    }
  }

  passwordBtn() {
    let check = this.state.allpassword.filter((item) => {
      return item !== ''
    })
    if (check.length === 5) {
      this.validationpassworld()
    } else {
      alert("رمز خود را وارد کنید")
    }
  }

  render() {
    return (
      <StyleWrapper>
        <div className="Header">
          <Grid container={true}>
            <div style={{display: this.state.logintoggle}} className="Login">
              <div style={{display: this.state.LoginModal}} className="LoginModal">
                <div className="LoginOrsingup">
                  <h4 className="LoginIsOpen ActiveTab">ورود به حساب کاربری</h4>
                </div>
                <div className="InputBox InputLogin">
                  {/*<img src={require('../../res/Img/search.png')}/>*/}
                  <input onChange={(newvalue) => {
                    this.handlephone(newvalue)
                  }} placeholder="شماره موبایل خود را وارد کنید"/>
                </div>
                <span style={{display: this.state.enterphone}} className='enterphone'>لطفا شماره موبایل خود را وارد کنید</span>
                <div onClick={() => {
                  this.gonext()
                }} className="btn LoginBtn">
                  <a onClick={(value) => {
                    this.validation(value)
                  }}>ورود</a>
                </div>
              </div>
              <div style={{display: this.state.password}} className="password">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className="InputBox InputLogin inpupassword">
                    <input ref={this.input5} onChange={(value) => {
                      this.password(value, 5)
                    }} maxLength={1} placeholder="*"/>
                  </div>
                  <div className="InputBox InputLogin inpupassword">
                    <input ref={this.input4} onChange={(value) => {
                      this.password(value, 4);
                      this.nextinput(4)
                    }} maxLength={1} placeholder="*"/>
                  </div>
                  <div className="InputBox InputLogin inpupassword">
                    <input ref={this.input3} onChange={(value) => {
                      this.password(value, 3);
                      this.nextinput(3)
                    }} maxLength={1} placeholder="*"/>
                  </div>
                  <div className="InputBox InputLogin inpupassword">
                    <input ref={this.input2} onChange={(value) => {
                      this.password(value, 2);
                      this.nextinput(2)
                    }} maxLength={1} placeholder="*"/>
                  </div>
                  <div className="InputBox InputLogin inpupassword">
                    <input ref={this.input1} onChange={(value) => {
                      this.password(value, 1);
                      this.nextinput(1)
                    }} maxLength={1} placeholder="*"/>
                  </div>
                </div>
                <div className="btn LoginBtn">
                  <a onClick={() => {
                    this.passwordBtn()
                  }}>ورود</a>
                </div>
                <div className="replay">
                  <a onClick={() => {
                    this.setState({password: 'none', LoginModal: 'flex', enterphone: 'none'})
                  }}>اصلاح شماره</a>
                  <a>ارسال مجدد</a>
                </div>
              </div>
            </div>

          </Grid>
          <div className="HeaderTop">
            <Container>
              <Grid container={true}>
                <Grid item lg={5} md={5} sm={5} xs={6}>
                  <div className="HeadMenu">
                    <div className="Menu">
                      <div onClick={() => {
                        this.toggleMenue()
                      }} className="Menubtn">
                        <a>دسته بندی ها</a>
                        {/*<img src={require('../../res/Img/Group 200.png')}/>*/}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={6}>
                  <div className="HeadLogo">
                    <Link href="Home.html">
                      {/*<img src={require('../../res/Img/logo.jpg')}/>*/}
                    </Link>
                  </div>
                </Grid>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                  <div className="HeadProfile">
                    <div onClick={() => {
                      this.setState({logintoggle: 'flex'})
                    }} className="Profile">
                      <span className='flaticon-user'/>
                      <a>پروفایل کاربری</a>
                    </div>
                    <div className="cart">
                      <a href="CartPayment.html">
                        <p className='flaticon-shopping-cart'/>
                        <span>سبد خرید</span>
                        <div className="Badge"><span>1</span></div>
                      </a>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container={true}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="InputBox sm">
                    <span className='flaticon-search'/>
                    <input placeholder='جستجو' type="search"/>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </StyleWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};


export default connect(mapStateToProps)(Index);
