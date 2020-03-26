import React, {Component} from 'react';
import {connect} from 'react-redux';
import Master from "../../components/Layouts/master";
import {Container, Paper} from "@material-ui/core";
import {LastBlogPosts, Paginator} from "../../components";
import Grid from "@material-ui/core/Grid";
import Line from "../../components/Line";
import Box from "../../components/Blog/box";
import {blogAction, shopAction} from "../../actions";
import {blogIfNeeded} from "../../actions/blog";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateBefore";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

function mapStateToProps(state) {
  return {
    blog: state.blog,
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blogIfNeeded(category, params) {
      dispatch(blogAction.blogIfNeeded(category, params));
    }
  };
}



class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 1,
        sort: 0,
        limit: 10
      }
    };
  }

  async componentDidMount() {

    const { params } = this.state;

    const queryString = require('query-string');
    // parse query string
    const query = queryString.parse(this.props.location.search);
    // fetch key for mapping
    let keys = Object.keys(query);

    for (let i = 0; i < keys.length ; i++) {

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

  async handlePageChange(page) {
    const { params } = this.state;
    params.page = page;

    await new Promise(resolve => {
      resolve(
        this.setState({
          params,
        })
      );
    });

    await this.handleRequest();
  }

  async handleRequest() {

    await this.props.blogIfNeeded(this.props.match.params.category, this.state.params);


    if (this.state.params.page > 1) {

      // create url
      let url = '?';
      url += `page=${this.state.params.page}`;

      this.props.history.push(`/blog/${url}`);
    }


    if (this.props.blog.readyStatus === 'success') {
      setTimeout(() => {
        let element = document.querySelector('body');
        if(element) {
          element.scrollIntoView({behavior: "smooth", block: "start"});
        }
      }, 500)
    }



  }

  render() {
    return (
      <Master>
        {this.props.blog.readyStatus === 'success' &&
        <>
          <Helmet>
            <title>{this.props.blog.data.category.meta_title}</title>
            <meta name='description' content={this.props.blog.data.category.meta_description} />
            <meta name='canonical' content={'/blog'} />
          </Helmet>
          <Container>
            <Grid item={true} xs={12}>
              <Paper style={{padding: '10px', marginTop: '10px'}}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                  <Link to={'/'}>
                    {this.props.setting.data.domain.name}
                  </Link>
                  <Link to={'/blog'}>
                    وبلاگ
                  </Link>
                  {this.props.blog.data.category.parents && this.props.blog.data.category.parents.map((nav, index) => {
                    return (
                      <Link key={index} to={'/blog/' + nav.slug}>
                        {nav.label}
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </Paper>
            </Grid>
            <Grid spacing={3} container>
              {this.props.blog.data.contents.data.map((item, index) => {
                return (
                  <Grid item key={index} xs={12} sm={6}>
                    <Box item={item}/>
                  </Grid>
                );
              })}
            </Grid>
            {/* pagination */}
            {this.props.blog.data.contents.data.length > 0 && <Grid spacing={2} container={true}>
              <Grid item xs={12}>
                <Paginator
                  activePage={parseInt(this.state.params.page)}
                  itemsCountPerPage={this.props.blog.data.contents.per_page}
                  totalItemsCount={this.props.blog.data.contents.total}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </Grid>
            </Grid>}
          </Container>
        </>
        }
      </Master>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
