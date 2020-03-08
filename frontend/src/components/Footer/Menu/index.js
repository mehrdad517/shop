import React, {Component} from 'react';
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

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    }
  }


  handleExpand(value)
  {

    let expanded = this.state.expanded;

    if (this.state.expanded.includes(value)) {
      let index = this.state.expanded.indexOf(value);
      this.state.expanded.splice(index, 1);
    } else {
      expanded.push(value);
    }

    this.setState({
      expanded
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
      const slug = item.label.replace(/\s+/g, '-');

      // external link
      const external_link = item.external_link !== null ? item.external_link : '';

      // check has child
      const hasChild = (item.children.length > 0) ? true : false;
      // check has child is true fetch children
      const children = hasChild ? this.renderTree(item.children) : '';

      return (
        <li key={key} className='tree-box'>
          <span className={hasChild === true ? 'tree-parent has-child' : 'tree-parent  has-no-child'}>
            <span onClick={() => this.handleExpand(value)}>
              {hasChild === true && (this.state.expanded.includes(value) ? <ExpandLessIcon color={"action"} fontSize={"small"} /> : <ExpandMoreIcon color={"action"} fontSize={"small"} />)}
            </span>
            {external_link !== '' ? <a target='_blank' href={external_link}>{label}</a> : <Link to={'/landing/' + slug }>{label}</Link> }
          </span>
          {hasChild === true &&
          <ul className='tree-children' style={{  display: ( this.state.expanded.includes(value) ? 'block' : 'none')}}>
            {children}
          </ul>}
        </li>
      );

    });


    return treeNodes
  }


  render() {
    return (
      <ul className="footer-menu">
        {this.renderTree(this.props.nodes)}
      </ul>
    );
  }
}

export default Index;
