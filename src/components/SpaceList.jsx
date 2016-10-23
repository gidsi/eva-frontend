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
    const items = this.props.spacedata.items.sort(
      (a, b) => a.space.toUpperCase().localeCompare(b.space.toUpperCase())
    );
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
          {items
            .map(space => (
              <TableRow key={space.space}>
                <TableRowColumn>
                  {space.space}
                </TableRowColumn>
                <TableRowColumn>
                  <a
                    href={space.url}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {space.url}
                  </a>
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
