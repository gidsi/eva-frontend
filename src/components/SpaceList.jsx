import React from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class SpaceList extends React.Component {
  static props = {
    fetchSpacedata: React.PropTypes.func.isRequired,
    spacedata: React.PropTypes.object,
  };

  static defaultProps = {
      spacedata: {
          items: [],
      }
  };

  componentWillMount() {
      this.props.fetchSpacedata();
  }

  render() {
    return(
      <Table
          selectable
          multiSelectable
      >
        <TableBody
            showRowHover
            stripedRows
            displayRowCheckbox={false}
        >
          {this.props.spacedata.items
              .map(space => {
            return (
                <TableRow key={space.space}>
                    <TableRowColumn>
                        {space.space}
                    </TableRowColumn>
                    <TableRowColumn>
                    </TableRowColumn>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default SpaceList;