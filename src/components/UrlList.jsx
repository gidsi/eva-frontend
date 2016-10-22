import React from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import { spaceUrlStruct } from '../redux/modules/spaceurl';

export class UrlList extends React.Component {
  static propTypes = {
    fetchSpaceUrl: React.PropTypes.func.isRequired,
    validateSpaceUrl: React.PropTypes.func.isRequired,
    spaceurls: spaceUrlStruct,
  };

  static defaultProps = {
    spaceurls: {
      items: [],
    },
  };

  componentWillMount() {
    this.props.fetchSpaceUrl();
  }

  getFormatedDateTime = timestamp => (
    moment
      .unix(timestamp)
      .format('DD.MM.YYYY HH:mm')
  );

  validateSpaceUrl = (spaceUrl) => {
    const validatedSpaceUrl = {
      url: spaceUrl.url,
      validated: true,
    };
    this.props.validateSpaceUrl(validatedSpaceUrl, this.secretInput.input.value);
  };

  render() {
    return (
      <div>
        <Table
          selectable
          multiSelectable
        >
          <TableBody
            showRowHover
            stripedRows
            displayRowCheckbox={false}
          >
            {this.props.spaceurls.items
              .map(spaceurl => (
                <TableRow key={spaceurl.url}>
                  <TableRowColumn>
                    <a
                      href={spaceurl.url}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {spaceurl.url}
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.getFormatedDateTime(spaceurl.lastUpdated)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {!spaceurl.validated ? <FlatButton
                      label={'validated'}
                      onTouchTap={() => this.validateSpaceUrl(spaceurl)}
                      primary
                    /> : null}
                  </TableRowColumn>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <TextField
          name={'secret-input'}
          ref={ref => (this.secretInput = ref)}
        />
      </div>
    );
  }
}

export default UrlList;
