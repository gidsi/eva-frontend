import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn }
  from 'material-ui/Table';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import { actions as calendarActions, eventStruct } from '../redux/modules/calendar';
import { spacedataStruct } from '../redux/modules/spacedata';

const mapStateToProps = state => ({
  events: state.calendars.items,
  spacedata: state.spacedata,
});

class EventList extends React.Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape(eventStruct),
    ),
    fetchCalendars: React.PropTypes.func,
    spacedata: spacedataStruct,
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
                this.props.spacedata.filter.indexOf(event.space) !== -1
                || this.props.spacedata.filter.length === 0
              )
            )
            .map(event => (
              <TableRow
                key={event.importId + event.start.toLocaleString() + event.description}
              >
                <TableRowColumn style={{ width: '80px', padding: '5px' }}>
                  {this.formatDate(event.start)}
                </TableRowColumn>
                <TableRowColumn style={{ width: '55px', padding: '5px' }}>
                  {event.wholeDayEvent ? null : this.formatTime(event.start)}
                </TableRowColumn>
                <TableRowColumn>
                  {event.summary || event.description}
                </TableRowColumn>
                <TableRowColumn>
                  {event.space}
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }}>
                  {event.url && <a href={event.url}>
                    <InfoIcon style={{ cursor: 'pointer' }} />
                  </a>}
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
