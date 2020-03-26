import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import {Link} from "react-router-dom";
import './menu.css'
import {SETTING_CHANGE_blogExpanded, SETTING_CHANGE_categoryExpanded, SETTING_CHANGE_menuExpanded} from "../../types";
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}


class Index extends Component {

  handleExpand(value, type)
  {
    let expanded = '';

    switch (type) {
      case 'category':

        expanded = this.props.setting.categoryExpanded;

        if (this.props.setting.categoryExpanded.includes(value)) {
          let index = this.props.setting.categoryExpanded.indexOf(value);
          this.props.setting.categoryExpanded.splice(index, 1);
        } else {
          expanded.push(value);
        }

        this.props.dispatch({
          type: SETTING_CHANGE_categoryExpanded,
          payload: expanded
        });
        break;

      case 'blog':
        expanded = this.props.setting.blogExpanded;

        if (this.props.setting.blogExpanded.includes(value)) {
          let index = this.props.setting.blogExpanded.indexOf(value);
          this.props.setting.blogExpanded.splice(index, 1);
        } else {
          expanded.push(value);
        }

        this.props.dispatch({
          type: SETTING_CHANGE_blogExpanded,
          payload: expanded
        });
        break;

      case 'menu':
        expanded = this.props.setting.menuExpanded;

        if (this.props.setting.menuExpanded.includes(value)) {
          let index = this.props.setting.menuExpanded.indexOf(value);
          this.props.setting.menuExpanded.splice(index, 1);
        } else {
          expanded.push(value);
        }

        this.props.dispatch({
          type: SETTING_CHANGE_menuExpanded,
          payload: expanded
        });
        break;
    }
  }


  renderCategoryTree(nodes) {
    // nodes mapping
    const treeNodes = nodes.map((item, key) => {
      // value id node
      const value = item.value;
      // label title node
      const label = item.label;

      // slug
      const slug = item.slug;

      // check has child
      const hasChild = (item.children.length > 0) ? true : false;

      // check has child is true fetch children
      const children = hasChild ? this.renderCategoryTree(item.children) : '';

      return (
        <li key={key} className='tree-box'>
          <span className={hasChild === true ? 'tree-parent has-child' : 'tree-parent  has-no-child'}>
            <span onClick={() => this.handleExpand(value, 'category')}>
              {hasChild === true && (this.props.setting.categoryExpanded && this.props.setting.categoryExpanded.includes(value) ? <RemoveCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} /> : <AddCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} />)}
            </span>
            <Link to={'/products/' + slug }>{label}</Link>
          </span>
          {hasChild === true &&
          <ul className='tree-children' style={{  display: ( this.props.setting.categoryExpanded && this.props.setting.categoryExpanded.includes(value) ? 'block' : 'none')}}>
            {children}
          </ul>}
        </li>
      );
    });

    return treeNodes
  }

  renderBlogTree(nodes) {
    // nodes mapping
    const treeNodes = nodes.map((item, key) => {
      // value id node
      const value = item.value;
      // label title node
      const label = item.label;

      // slug
      const slug = item.slug;

      // check has child
      const hasChild = (item.children.length > 0) ? true : false;

      // check has child is true fetch children
      const children = hasChild ? this.renderBlogTree(item.children) : '';

      return (
        <li key={key} className='tree-box'>
          <span className={hasChild === true ? 'tree-parent has-child' : 'tree-parent  has-no-child'}>
            <span onClick={() => this.handleExpand(value, 'blog')}>
              {hasChild === true && (this.props.setting.blogExpanded && this.props.setting.blogExpanded.includes(value) ? <RemoveCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} /> : <AddCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} />)}
            </span>
            <Link to={'/blog/' + slug }>{label}</Link>
          </span>
          {hasChild === true &&
          <ul className='tree-children' style={{  display: ( this.props.setting.blogExpanded && this.props.setting.blogExpanded.includes(value) ? 'block' : 'none')}}>
            {children}
          </ul>}
        </li>
      );
    });

    return treeNodes
  }

  renderMenuTree(nodes) {
    // nodes mapping
    const treeNodes = nodes.map((item, key) => {
      // value id node
      const value = item.value;
      // label title node
      const label = item.label;

      // slug
      const slug = item.slug;


      const link = item.external_link;

      // check has child
      const hasChild = (item.children.length > 0) ? true : false;

      // check has child is true fetch children
      const children = hasChild ? this.renderMenuTree(item.children) : '';

      return (
        <li key={key} className='tree-box'>
          <span className={hasChild === true ? 'tree-parent has-child' : 'tree-parent  has-no-child'}>
            <span onClick={() => this.handleExpand(value, 'menu')}>
              {hasChild === true && (this.props.setting.menuExpanded && this.props.setting.menuExpanded.includes(value) ? <RemoveCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} /> : <AddCircleOutlineOutlinedIcon color={"action"} fontSize={"small"} />)}
            </span>
            {link ? <a target='_blank' href={link}>{label}</a> : <Link to={'/page/' + slug }>{label}</Link>}
          </span>
          {hasChild === true &&
          <ul className='tree-children' style={{  display: ( this.props.setting.menuExpanded && this.props.setting.menuExpanded.includes(value) ? 'block' : 'none')}}>
            {children}
          </ul>}
        </li>
      );
    });

    return treeNodes
  }

  render() {
    return (
      <div>
        <ul className='menu-container'>
          <li>
            <AppsIcon  />&nbsp;
            <Link to={'/'}>صفحه نخست</Link>
          </li>
          <li>
            <AccountCircleIcon color={"primary"} />&nbsp;
            <Link to={'/dashboard'}>پنل کاربری</Link>
          </li>
          <li>
            <AssignmentIcon color={"secondary"} />&nbsp;
            <Link to={'/blog'}>وبلاگ</Link>
          </li>
        </ul>
        <Divider />
        {! window.location.href.match('/blog/') ?
          <>
          {this.props.setting.data.menu.length > 0 && <>
            <div className='menu-container'>
              {this.renderMenuTree(this.props.setting.data.menu)}
            </div>
            <Divider />
          </>}
          {this.props.setting.data.product_categories.length > 0 && <>
            <div className='menu-container'>
              {this.renderCategoryTree(this.props.setting.data.product_categories)}
            </div>
            <Divider />
          </>}
        </> :
          <>
          {this.props.setting.data.blog_categories.length > 0 && <>
            <div className='menu-container'>
              {this.renderBlogTree(this.props.setting.data.blog_categories)}
            </div>
          </>}
        </>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Index);

