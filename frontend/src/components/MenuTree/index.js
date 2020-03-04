import React, {Component} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const nodes = [{
  value: 'mars',
  label: 'Mars',
  showCheckbox: false,
  children: [
    { value: 'phobos', label: 'Phobos',   showCheckbox: false },
    { value: 'deimos', label: 'Deimos',   showCheckbox: false },
  ],
}];


class Index extends Component {

  state = {
    checked: [],
    expanded: [],
  };

  render() {
    return (
        <CheckboxTree
          nodes={nodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
          icons={{
            check: '',
            uncheck: '',
            halfCheck: '',
            expandClose: <AddCircleIcon />,
            expandOpen: <RemoveCircleIcon />,
            expandAll: '',
            collapseAll: '',
            parentClose: '',
            parentOpen: '',
            leaf: '',
          }}
        />
    );
  }
}

export default Index;
