import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {Link} from "react-router-dom";
import './menu.css'
import {SETTING_CHANGE_CATEGORY_EXPANDED} from "../../types";

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}


class Index extends Component {

  handleExpand(value)
  {

    let expanded = this.props.setting.categoryExpanded;

    if (this.props.setting.categoryExpanded.includes(value)) {
      let index = this.props.setting.categoryExpanded.indexOf(value);
      this.props.setting.categoryExpanded.splice(index, 1);
    } else {
      expanded.push(value);
    }

    this.props.dispatch({
      type: SETTING_CHANGE_CATEGORY_EXPANDED,
      payload: expanded
    });

  }


  renderTree(nodes) {
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
      const children = hasChild ? this.renderTree(item.children) : '';

      return (
        <li key={key} className='tree-box'>
          <span className={hasChild === true ? 'tree-parent has-child' : 'tree-parent  has-no-child'}>
            <span onClick={() => this.handleExpand(value)}>
              {hasChild === true && (this.props.setting.categoryExpanded && this.props.setting.categoryExpanded.includes(value) ? <ExpandLessIcon color={"action"} fontSize={"small"} /> : <ExpandMoreIcon color={"action"} fontSize={"small"} />)}
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

  render() {
    return (
      <div>
        {this.renderTree(this.props.setting.data.product_categories)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Index);

