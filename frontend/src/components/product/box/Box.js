import React, {Component} from 'react';
import StyleWarpper from './Box.style'
import {Link} from "react-router-dom";
import Badge from "../badge/Badge";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CurrencyFormat from "react-currency-format";

class Box extends Component {

  render() {
    return (
      <StyleWarpper>
        <div className="Box">
          <Badge />
          <div className="BoxImg">
            <Link to={'/product/' + this.props.item.id + '/' + this.props.item.slug}>
              <img src={this.props.item.files[0].prefix + '/200/' + this.props.item.files[0].file}/>
            </Link>
          </div>
          <h4 className='title'>
            <Link to={'/product/' + this.props.item.id + '/' + this.props.item.slug}>
              {this.props.item.title && this.props.item.title.substr(0,60)}
            </Link>
          </h4>
          <div className="price">
            <span className="boxOff"><CurrencyFormat value={this.props.item.price}  displayType={'text'} thousandSeparator={true} /></span>
            <span className="boxPrice"><CurrencyFormat value={this.props.item.price}  displayType={'text'} thousandSeparator={true} />&nbsp;<span className="boxPrice-title" >تومان</span></span>
          </div>
          <Button className="box-button"
                  variant={"contained"} color="primary"
                  endIcon={<ShoppingCartIcon />}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </StyleWarpper>
    );
  }
}

export default Box;
