import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import DateRangeIcon from '@material-ui/icons/DateRange';
import moment from 'moment-jalaali';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import StyleWrapper from './box.style';

class Box extends Component {
  render() {
    return (
      <StyleWrapper>
        <div className="NewsItems">
          {this.props.item.files[0] && (
            <img src={this.props.item.files[0].prefix + '/100/' + this.props.item.files[0].file} />
          )}
          <div className="NewsItem">
            <h4><Link to={`/blog/post/${this.props.item.id}/${this.props.item.slug}`}>{this.props.item.title}</Link></h4>
            <Grid spacing={3} container>
              <ul>
                <li>
                  <ShowChartIcon color="primary" fontSize="small" />
                  <span>{this.props.item.visitor}</span>
                </li>
                <li>
                  <DateRangeIcon color="primary" fontSize="small" />
                  <span style={{ direction: 'ltr' }}>
                    {moment(this.props.item.created_at, 'YYYY/MM/DD HH:mm:ss')
                      .locale('fa')
                      .format('jYYYY/jMM/jDD HH:mm:ss')}
                  </span>
                </li>
              </ul>
            </Grid>
            <p>{this.props.item.content}</p>
            <div className="Continues">
              <Link to={`/blog/post/${this.props.item.id}/${this.props.item.slug}`}>
                ادامه
              </Link>
              <KeyboardReturnIcon color="primary" fontSize="small" />
            </div>
          </div>
        </div>
      </StyleWrapper>
    );
  }
}

export default Box;
