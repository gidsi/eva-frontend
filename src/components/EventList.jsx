import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { actions as calendarActions, eventStruct } from '../redux/modules/calendar';
import { filterStruct } from '../redux/modules/spacedata';

const mapStateToProps = state => ({
  events: state.calendars.items,
  filter: state.spacedata.filter,
});

class EventList extends React.Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape(eventStruct),
    ),
    fetchCalendars: React.PropTypes.func,
    filter: filterStruct,
  };

  defaultProps = {
    events: [],
  };

  componentWillMount() {
    this.props.fetchCalendars();
  }

  formatDate = date => (date.format('DD.MM.YYYY'));
  formatTime = date => (date.format('HH:mm'));

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
          {this.props.events
            .filter(event =>
              (
                this.props.filter.indexOf(event.space) !== -1
                || this.props.filter.length === 0
              )
            )
            .map(event => (
              <TableRow
                key={event.importedId + (event.description || event.summary)}
              >
                <TableRowColumn style={{ width: '80px', padding: '5px' }}>
                  {this.formatDate(event.start)}
                </TableRowColumn>
                <TableRowColumn style={{ width: '55px', padding: '5px' }}>
                  {event.wholeDayEvent ? null : this.formatTime(event.start)}
                </TableRowColumn>
                <TableRowColumn>
                  {event.description || event.summary}
                </TableRowColumn>
                <TableRowColumn>
                  {event.space}
                </TableRowColumn>
                <TableRowColumn>
                  {event.url}
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

export default connect(mapStateToProps, {
  ...calendarActions,
})(EventList);
