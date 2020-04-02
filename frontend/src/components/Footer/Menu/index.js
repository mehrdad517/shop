import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Link } from 'react-router-dom';
import './menu.css';
import {
  SETTING_CHANGE_blogExpanded,
  SETTING_CHANGE_categoryExpanded,
  SETTING_CHANGE_footerExpanded,
  SETTING_CHANGE_menuExpanded
} from '../../../types';

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}

class Index extends Component {
  handleExpand(value) {
    const expanded = this.props.setting.footerExpanded;

    if (this.props.setting.footerExpanded.includes(value)) {
      const index = this.props.setting.footerExpanded.indexOf(value);
      this.props.setting.footerExpanded.splice(index, 1);
    } else {
      expanded.push(value);
    }

    this.props.dispatch({
      type: SETTING_CHANGE_footerExpanded,
      payload: expanded
    });
  }

  renderTree(nodes) {
    // nodes mapping
    const treeNodes = nodes.map((item, key) => {
      // value id node
      const { value } = item;

      // label title node
      const { label } = item;

      // slug
      const slug = item.label.replace(/\s+/g, '-');

      // external link
      const external_link =
        item.external_link !== null ? item.external_link : '';

      // check has child
      const hasChild = item.children.length > 0;
      // check has child is true fetch children
      const children = hasChild ? this.renderTree(item.children) : '';

      return (
        <li key={key} className="tree-box">
          <span
            className={
              hasChild === true
                ? 'tree-parent has-child'
                : 'tree-parent  has-no-child'
            }
          >
            <span onClick={() => this.handleExpand(value)}>
              {hasChild === true &&
                (this.props.setting.footerExpanded &&
                this.props.setting.footerExpanded.includes(value) ? (
                  <ExpandLessIcon color="action" fontSize="small" />
                ) : (
                  <ExpandMoreIcon color="action" fontSize="small" />
                ))}
            </span>
            {external_link !== '' ? (
              <a target="_blank" href={external_link}>
                {label}
              </a>
            ) : (
              <Link to={`/page/${slug}`}>{label}</Link>
            )}
          </span>
          {hasChild === true && (
            <ul
              className="tree-children"
              style={{
                display:
                  this.props.setting.footerExpanded &&
                  this.props.setting.footerExpanded.includes(value)
                    ? 'block'
                    : 'none'
              }}
            >
              {children}
            </ul>
          )}
        </li>
      );
    });

    return treeNodes;
  }

  render() {
    return <ul className="footer-menu">{this.renderTree(this.props.nodes)}</ul>;
  }
}

export default connect(mapStateToProps)(Index);
