import React from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { spacedataStruct } from '../redux/modules/spacedata';

export class SpaceList extends React.Component {
  static propTypes = {
    fetchSpacedata: React.PropTypes.func.isRequired,
    spacedata: spacedataStruct,
  };

  static defaultProps = {
    spacedata: {
      items: [],
    },
  };

  componentWillMount() {
    this.props.fetchSpacedata();
  }

  render() {
    return (
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
            .map(space => (
              <TableRow key={space.space}>
                <TableRowColumn>
                  {space.space}
                </TableRowColumn>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    );
  }
}

export default SpaceList;
