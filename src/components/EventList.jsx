import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { actions as calendarActions } from '../redux/modules/calendar';

const mapStateToProps = (state) => ({
  events: state.calendars.items,
  spacedata: state.spacedata,
});

class EventList extends React.Component {
  static propTypes = {
    events: React.PropTypes.array,
    fetchCalendars: React.PropTypes.func,
    spacedata: React.PropTypes.object,
  };

  defaultProps = {
    events: [],
  };

  componentWillMount() {
    this.props.fetchCalendars();
  }

  formatDate = (date) => (date.format('DD.MM.YYYY'));
  formatTime = (date) => (date.format('HH:mm'));

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
                this.props.spacedata.filter.indexOf(event.space) !== -1
                || this.props.spacedata.filter.length === 0
              )
            )
            .map(event => (
              <TableRow
                key={event.ImportedId + (event.Description || event.Summary)}
              >
                <TableRowColumn style={{ width: '80px', padding: '5px' }}>
                  {this.formatDate(event.start)}
                </TableRowColumn>
                <TableRowColumn style={{ width: '55px', padding: '5px' }}>
                  {event.WholeDayEvent ? null : this.formatTime(event.start)}
                </TableRowColumn>
                <TableRowColumn>
                  {event.Description || event.Summary}
                </TableRowColumn>
                <TableRowColumn>
                  {event.space}
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
