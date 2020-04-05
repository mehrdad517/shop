import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import {CircularProgress, Container, Paper} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClipLoader from 'react-spinners/SyncLoader';
import {Paginator, Sidebar} from '../../components';
import Master from '../../components/Layouts/master';
import Box from '../../components/product/box/Box';
import { shopAction } from '../../actions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom'
import NavigateNextIcon from '@material-ui/icons/NavigateBefore';
import './style.scss';
import {Helmet} from "react-helmet";
import Typography from '@material-ui/core/Typography';
import Alert from "@material-ui/lab/Alert";
import Drawer from "@material-ui/core/Drawer";

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 1,
        stock: 1,
        sort: 0,
        brands:[],
        attributes: {},
        checked: [],
        expanded: [],
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
        case 'stock':
          params.stock = parseInt(query.stock);
          break;
        case 'brands':
          params.brands = query.brands.split(',').map((value) => {
            return parseInt(value);
          });
          break;
        default:
          // get attributes such as A6, A12, ...
          if (keys[i].match(/A(\d+)/)) {
            params.attributes[keys[i]] = query[keys[i]].split(',').map((value) => {
              return parseInt(value);
            });
          }
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

    if (this.props.match.params.categories !== prevProps.match.params.categories) {
      let params = this.state.params;

      params = {
        page: 1,
        stock: 1,
        sort: 0,
        brands:[],
        attributes: {},
      };

      this.setState({
        params,
      });

      await this.handleRequest();
    }
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

  async handleOnChange(event) {
    const { params } = this.state;

    params[event.target.name] = parseInt(event.target.value);
    params.page = 1;

    await new Promise(resolve => {
      resolve(
        this.setState({
          params
        })
      );
    });

    await this.handleRequest();
  }

  async handleOnChangeFilters(event) {

    const { params } = this.state;

    params.page = 1;

    if (event.target.checked === true) {
      params[event.target.name].push(parseInt(event.target.value));
    } else {
      let index = params[event.target.name].indexOf(parseInt(event.target.value));
      params[event.target.name].splice(index, 1);
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

  // change attributes
  async handleOnChangeAttributes(event, attr, value) {

    const { params } = this.state;

    // set default page
    params.page = 1;

    // build array attribute if not exist
    if (typeof params['attributes']['A' + attr] === "undefined") {
      params['attributes']['A' + attr] = [];
    }

    // push or remove attribute
    if (event.target.checked === true) {
      params['attributes']['A' + attr].push(value);
    } else {
      if (params['attributes']['A' + attr].length === 1) { // if length 0 delete all item
        delete params['attributes']['A' + attr];
      } else {
        let index = params['attributes']['A' + attr].indexOf(value);
        params['attributes']['A' + attr].splice(index, 1); // splice remove key with index
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

  async handleRequest() {

    const { fetchShopIfNeeded } = this.props;

    await fetchShopIfNeeded(this.props.match.params.categories, this.state.params);

    if (this.props.shop.loading) {
      setTimeout(() => {
        let element = document.querySelector('body');
        if(element) {
          element.scrollIntoView({behavior: "smooth", block: "start"});
        }
      }, 500)
    }

    // create url
    let url = '?';
    url += `page=${this.state.params.page}`;
    url += `&stock=${this.state.params.stock}`;
    url += `&sort=${this.state.params.sort}`;

    // brand
    if (this.state.params.brands.length > 0) {
      url += '&brands=' + this.state.params.brands.join(',');
    }

    //attributes
    for (let i = 0; i < Object.keys(this.state.params.attributes).length; i++) {
      url += '&' + Object.keys(this.state.params.attributes)[i] + '=' + this.state.params.attributes[Object.keys(this.state.params.attributes)[i]].join(',');
    }

    this.props.history.push(`/products/${this.props.match.params.categories}/${url}`);

  }

  render() {
    const override = `transform: translate(-50%, -50%);position: fixed;top: 50%;left: 50%;z-index: 9999999999`;
    return (
      <Master>
        {this.props.shop.readyStatus === 'success' &&
        <div className={this.props.shop.loading ? "disclicks" : ''}>
          <Helmet>
            <title>{this.props.shop.data.cached.meta_title}</title>
            <meta name='description' content={this.props.shop.data.cached.meta_description} />
            <meta name='canonical' content={'/products/' + this.props.shop.data.cached.slug} />
          </Helmet>
          <div className="shop">
            {/* navigation */}
            <Grid spacing={2} container={true}>
              <Grid item={true} xs={12}>
                <Paper style={{ padding: '10px'}}>
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <span>
                    دسته بندی محصولات
                  </span>
                    {this.props.shop.data.cached.navigation && this.props.shop.data.cached.navigation.map((nav, index) => {
                      return(
                        <Link key={index} to={'/products/' + nav.slug }>
                          {nav.label}
                        </Link>
                      );
                    })}
                  </Breadcrumbs>
                </Paper>
              </Grid>
            </Grid>
            {/* main content */}
            <Grid spacing={2} container={true}>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                {/* aside content */}
                <div className='shop-aside'>
                  {/* stock */}
                  <Paper>
                    <List>
                      <ListItem>
                        <ListItemText
                          id="switch-list-label-wifi"
                          primary="نمایش کالاهای موجود"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            color="primary"
                            edge="end"
                            name="stock"
                            value={this.state.params.stock === 1 ? 0 : 1}
                            checked={Boolean(this.state.params.stock)}
                            onChange={this.handleOnChange.bind(this)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Paper>
                  {/* sort */}
                  <ExpansionPanel expanded>
                    <ExpansionPanelSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <b>مرتب سازی</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <RadioGroup aria-label="sort" name="sort">
                        {this.props.shop.data.cached.sort && this.props.shop.data.cached.sort.map((ord, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              checked={this.state.params.sort === index}
                              value={index}
                              control={<Radio color={"primary"} />}
                              label={ord.title}
                              onChange={this.handleOnChange.bind(this)}
                            />
                          );
                        })}
                      </RadioGroup>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {/* category */}
                  {this.props.shop.data.cached.tree.length > 0 && <ExpansionPanel expanded>
                    <ExpansionPanelSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <b>دسته بندی</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <List>
                        {this.props.shop.data.cached.tree.map((tree, index) => {
                          return(
                            <ListItem component={Link} to={'/products/' + tree.slug} key={index}>
                              <ListItemText primary={tree.label} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>}
                  {/* brands filter */}
                  {this.props.shop.data.cached.brands.length > 0 && <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <b>برندها</b>
                    </ExpansionPanelSummary>
                    <List>
                      {this.props.shop.data.cached.brands.map((b, i) => {
                        return (
                          <ListItem key={i}>
                            <ListItemText primary={b.title} />
                            <ListItemSecondaryAction>
                              <Switch
                                name="brands"
                                color="primary"
                                edge="end"
                                checked={this.state.params.brands.includes(b.id)}
                                value={b.id}
                                onChange={this.handleOnChangeFilters.bind(this)}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ExpansionPanel>}
                  {/* attributes filter  */}
                  {this.props.shop.data.cached.attributes && this.props.shop.data.cached.attributes.map((attr, index) => {
                    return(
                      <div key={index} className='shop-attr'>
                        {attr.tags.length > 0 && <ExpansionPanel key={index}>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <b>{attr.title}</b>
                          </ExpansionPanelSummary>
                          <List>
                            {attr.tags.map((t, i) => {
                              return (
                                <ListItem key={i}>
                                  <ListItemText primary={t.name} />
                                  <ListItemSecondaryAction>
                                    <Switch
                                      name="attributes"
                                      color="primary"
                                      edge="end"
                                      checked={typeof this.state.params.attributes['A' + attr.id] !== "undefined" && this.state.params.attributes['A' + attr.id].includes(t.id) ? true : false}
                                      value={t.id}
                                      onChange={(event) => this.handleOnChangeAttributes(event, attr.id, t.id)}
                                    />
                                  </ListItemSecondaryAction>
                                </ListItem>
                              );
                            })}
                          </List>
                        </ExpansionPanel>}
                      </div>
                    );
                  })}
                </div>
              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <Grid item spacing={2} container>
                  {this.props.shop.data.products.data.length > 0 ? this.props.shop.data.products.data.map((item, index) => {
                    return (
                      <Grid key={index} item lg={3} md={4} sm={4} xs={12}>
                        <Box key={index} item={item} />
                      </Grid>
                    );
                  }) : <Grid item={true} xs={12}><Alert severity="warning">جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.</Alert></Grid>}
                </Grid>
              </Grid>
            </Grid>
            {/* pagination */}
            {this.props.shop.data.products.data.length > 0 && <Grid spacing={2} container={true}>
              <Grid item xs={12}>
                <Paginator
                  activePage={parseInt(this.state.params.page)}
                  itemsCountPerPage={this.props.shop.data.products.per_page}
                  totalItemsCount={this.props.shop.data.products.total}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </Grid>
            </Grid>}
          </div>
        </div>
        }
        {/* loading */}
        <ClipLoader
          css={override}
          size={10}
          color="#36D7B7"
          loading={this.props.shop.loading}
        />
      </Master>
    );
  }
}

function mapStateToProps(state) {
  return {
    shop: state.shop
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShopIfNeeded(categories, parameters) {
      dispatch(shopAction.fetchShopIfNeeded(categories, parameters));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
