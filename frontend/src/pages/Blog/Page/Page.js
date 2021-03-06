import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateBefore';
import { Helmet } from 'react-helmet';
import moment from 'moment-jalaali';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '../../../components/product/box/Box';
import { pageAction } from '../../../actions';
import Master from '../../../components/Layouts/master';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';


function mapStateToProps(state) {
  return {
    setting: state.setting,
    page: state.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPageIfNeeded(id) {
      dispatch(pageAction.fetchPageIfNeeded(id));
    }
  };
}

class Page extends Component {

  constructor(props) {
    super();
    this.state = {
      gallery: false
    }
  }


  async componentDidMount() {
    this.handleRequest();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.handleRequest();
    }
  }

  async handleRequest() {
    const { fetchPageIfNeeded } = this.props;

    await fetchPageIfNeeded(this.props.match.params.id);

    if (this.props.page.loading) {
      setTimeout(() => {
        const element = document.querySelector('body');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }

  render() {

    const params = {
      effect: 'flip',
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
    }
    return (
      <Master>
        <Helmet>
          <title>{this.props.page.data.meta_title}</title>
          <meta
            name="description"
            content={this.props.page.data.meta_description}
          />
          <meta
            name="canonical"
            content={`/blog/post/${this.props.page.data.id}/${this.props.page.data.slug}`}
          />
        </Helmet>
        {this.props.page.readyStatus === 'success' && <div className="post">
          <Container>
            <Paper className="post-navigation">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <Link color="inherit" to="/">
                  {this.props.setting.data.domain && this.props.setting.data.domain.name}
                </Link>
                <Link color="inherit" to="/blog">
                  بلاگ
                </Link>
                {this.props.page.data.categories &&
                this.props.page.data.categories.length > 0 &&
                this.props.page.data.categories[0].parents.map(
                  (parent, index) => {
                    return (
                      <Link key={index}
                            color="inherit"
                            to={`/blog/category/${parent.label}`}
                      >
                        {parent.label}
                      </Link>
                    );
                  }
                )}
                <b>{this.props.page.data.title}</b>
              </Breadcrumbs>
            </Paper>
            <Paper className="post-title">
              <h1 className="post-title-text">{this.props.page.data.title}</h1>
              <h2 className="post-title-heading">
                {this.props.page.data.heading}
              </h2>
              <ul className="post-title-list">
                {this.props.page.data.created_by && (
                  <li>
                    <AccountCircleIcon />&nbsp;
                    {this.props.page.data.created_by.name}
                  </li>
                )}
                {this.props.page.data.created_at && (
                  <li>
                    <TodayOutlinedIcon />
                    &nbsp;
                    <time>
                      {moment(
                        this.props.page.data.created_at,
                        'YYYY/MM/DD HH:mm:ss'
                      )
                        .locale('fa')
                        .format('jYYYY/jMM/jDD HH:mm:ss')}
                    </time>
                  </li>
                )}
              </ul>
            </Paper>
            <Grid spacing={2} container>
              <Grid item lg={9} md={9} sm={12} xs={12}>
                <Paper  className="post-description">
                  {this.props.page.data.files && this.props.page.data.files.length > 0 && (
                    <img
                      src={`${this.props.page.data.files[0].prefix}/${this.props.page.data.files[0].file}`}
                    />
                  )}
                  <div className="paragraph-box">
                    <p>{this.props.page.data.content}</p>
                  </div>
                </Paper>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <aside>
                  {this.props.page.data.products && this.props.page.data.products.length > 0 && (
                    <Swiper {...params}>
                      {this.props.page.data.products.map((item, index) => {
                        return (
                          <div>
                            <Box key={index} item={item} />
                          </div>
                          )
                        ;
                      })}
                    </Swiper>
                  )}
                  {this.props.page.data.categories && this.props.page.data.categories.length > 0 && this.props.page.data.categories.map((category, index) => {
                    return (
                      <div key={index}>
                        {category.contents && (
                          <div key={index} className="suggested-articles">
                            <h5 className="suggested-articles-title">
                              {category.label}
                            </h5>
                            <ul className="suggested-articles-list">
                              {category.contents.map((content, index) => {
                                return (
                                  <li key={index}>
                                    {content.files.length > 0 && (
                                      <img
                                        src={`${content.files[0].prefix}/${content.files[0].file}`}
                                      />
                                    )}
                                    <div>
                                      <p>
                                        <Link to={`/blog/post/${content.id}/${content.slug}`}>
                                          {content.title}
                                        </Link>
                                      </p>
                                      <time>
                                        {moment(
                                          content.created_at,
                                          'YYYY/MM/DD HH:mm:ss'
                                        )
                                          .locale('fa')
                                          .format('jYYYY/jMM/jDD HH:mm:ss')}
                                      </time>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="post-gallery-articles">
                    <h5 className="post-gallery-articles-title">
                      گالری تصاویر
                    </h5>
                    <div className="post-gallery">
                      <Grid container spacing={1}>
                        {this.props.page.data.files && this.props.page.data.files.map((item, index) => {
                          return (
                            <Grid key={index} item xs={6}>
                              <ReactFancyBox
                                thumbnail={item.prefix + '/200/' + item.file}
                                image={item.prefix + '/' + item.file}/>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </div>
                  </div>
                  {this.props.page.data.tags &&
                  this.props.page.data.tags.length > 0 && (
                    <div className="post-tags">
                      <ul>
                        {this.props.page.data.tags.map((tag, index) => {
                          return (
                            <li key={index}>
                              <Chip
                                component={Link}
                                to={`/blog/tag/${tag.name}`}
                                variant="outlined"
                                color="primary"
                                clickable
                                size="small"
                                label={tag.name}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </aside>
              </Grid>
            </Grid>
          </Container>
        </div>}
      </Master>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
