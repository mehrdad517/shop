import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateBefore';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/SyncLoader';
import Alert from '@material-ui/lab/Alert';
import Master from '../../components/Layouts/master';
import { LastBlogPosts, Paginator } from '../../components';
import Line from '../../components/Line';
import Box from '../../components/Blog/box';
import { blogAction, shopAction } from '../../actions';
import { blogIfNeeded } from '../../actions/blog';

function mapStateToProps(state) {
  return {
    blog: state.blog,
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blogIfNeeded(params, category, tag) {
      dispatch(blogAction.blogIfNeeded(params, category, tag));
    }
  };
}

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 1
      }
    };
  }

  async componentDidMount() {
    const { params } = this.state;

    const queryString = require('query-string');
    // parse query string
    const query = queryString.parse(this.props.location.search);

    // fetch key for mapping
    const keys = Object.keys(query);

    for (let i = 0; i < keys.length; i++) {
      switch (keys[i]) {
        case 'page':
          params.page = parseInt(query.page);
          break;
        case 'sort':
          params.sort = parseInt(query.sort);
          break;
      }
    }

    await new Promise(resolve => {
      resolve(
        this.setState({
          params
        })
      );
    });

    await this.handleRequest();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.match.params.categories !== this.props.match.params.categories
    ) {
      await this.handleRequest();
    }

    if (prevProps.match.params.tag !== this.props.match.params.tag) {
      await this.handleRequest();
    }
  }

  async handlePageChange(page) {
    const { params } = this.state;
    params.page = page;

    await new Promise(resolve => {
      resolve(
        this.setState({
          params
        })
      );
    });

    await this.handleRequest();
  }

  async handleRequest() {
    await this.props.blogIfNeeded(
      this.state.params,
      this.props.match.params.categories,
      this.props.match.params.tag
    );

    console.log(this.props.blog);

    if (this.state.params.page > 1) {
      // create url
      let url = '?';
      url += `page=${this.state.params.page}`;

      if (this.props.match.params.categories) {
        this.props.history.push(
          `/blog/${this.props.match.params.categories}/${url}`
        );
      } else if (this.props.match.params.tag) {
        this.props.history.push(
          `/blog/tag/${this.props.match.params.tag}/${url}`
        );
      } else {
        this.props.history.push(`/blog/${url}`);
      }
    }

    setTimeout(() => {
      const element = document.querySelector('body');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }

  render() {
    const override = `transform: translate(-50%, -50%);position: fixed;top: 50%;left: 50%;z-index: 9999999999`;
    return (
      <Master>
        {this.props.blog.readyStatus === 'success' && (
          <>
            <Helmet>
              {this.props.match.params.categories && (
                <title>
                  {this.props.blog.data.category.meta_title
                    ? this.props.blog.data.category.meta_title
                    : this.props.blog.data.category.label}
                </title>
              )}
              {this.props.match.params.tag && (
                <title>
                  {this.props.blog.data.category.meta_title
                    ? this.props.blog.data.category.meta_title
                    : this.props.blog.data.category.label}
                </title>
              )}
              {this.props.match.params.tag === undefined &&
                this.props.match.params.categories === undefined && (
                  <title>{this.props.setting.data.domain.blog_title}</title>
                )}

              {this.props.match.params.categories && (
                <meta
                  name="description"
                  content={
                    this.props.blog.data.category.meta_description
                      ? this.props.blog.data.category.meta_description
                      : this.props.setting.data.domain.blog_description
                  }
                />
              )}
              {this.props.match.params.tag && (
                <meta
                  name="description"
                  content={
                    this.props.blog.data.category.meta_description
                      ? this.props.blog.data.category.meta_description
                      : this.props.setting.data.domain.blog_description
                  }
                />
              )}
              {this.props.match.params.tag === undefined &&
                this.props.match.params.categories === undefined && (
                  <meta
                    name="description"
                    content={this.props.setting.data.domain.blog_description}
                  />
                )}

              {this.props.match.params.categories && (
                <meta
                  name="canonical"
                  content={`/blog/${this.props.match.params.categories}`}
                />
              )}
              {this.props.match.params.tag && (
                <meta
                  name="canonical"
                  content={`/blog/tag/${this.props.match.params.tag}`}
                />
              )}
              {this.props.match.params.tag === undefined &&
                this.props.match.params.categories === undefined && (
                  <meta name="canonical" content="/blog" />
                )}
            </Helmet>
            <Container>
              <Grid item xs={12}>
                <Paper style={{ padding: '10px', margin: '10px 0' }}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    <Link to="/">
                      {this.props.setting.data.domain &&
                        this.props.setting.data.domain.name}
                    </Link>
                    <Link to="/blog">وبلاگ</Link>
                    {this.props.match.params.tag && (
                      <Link
                        to={`/blog/tag/${this.props.blog.data.category.label}`}
                      >
                        {this.props.blog.data.category.label}
                      </Link>
                    )}
                    {this.props.blog.data.category.parents &&
                      this.props.blog.data.category.parents.map(
                        (nav, index) => {
                          return (
                            <Link key={index} to={`/blog/${nav.slug}`}>
                              {nav.label}
                            </Link>
                          );
                        }
                      )}
                  </Breadcrumbs>
                </Paper>
              </Grid>
              <Grid spacing={3} container>
                {this.props.blog.data.contents.data.length > 0 ? (
                  this.props.blog.data.contents.data.map((item, index) => {
                    return (
                      <Grid item key={index} xs={12} sm={6}>
                        <Box item={item} />
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item xs={12}>
                    <Alert severity="warning">
                      پستی با این نتایج ثبت نشده است.
                    </Alert>
                  </Grid>
                )}
              </Grid>
              {/* pagination */}
              {this.props.blog.data.contents.data.length > 0 && (
                <Grid spacing={2} container>
                  <Grid item xs={12}>
                    <Paginator
                      activePage={parseInt(this.state.params.page)}
                      itemsCountPerPage={this.props.blog.data.contents.per_page}
                      totalItemsCount={this.props.blog.data.contents.total}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </Grid>
                </Grid>
              )}
            </Container>
          </>
        )}
        {/* loading */}
        <ClipLoader
          css={override}
          size={10}
          color="#36D7B7"
          loading={this.props.blog.loading}
        />
      </Master>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
