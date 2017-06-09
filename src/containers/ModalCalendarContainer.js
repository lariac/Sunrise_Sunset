import React from 'react';
import ModalCalendar from '../components/ModalCalendar/ModalCalendar';
import moment from 'moment';

class ModalCalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <ModalCalendar startDate={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
};

export default ModalCalendarContainer;  