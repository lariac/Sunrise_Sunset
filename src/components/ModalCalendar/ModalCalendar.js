import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import DatePicker from 'react-datepicker';
//import style from '../../../node_modules/react-datepicker/dist/react-datepicker.css';


class ModalCalendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={"opac " + (this.props.showModal ? "showModal" : "hideModal")}>
        <div className="modalStyle showModalAnimation">
          <DatePicker
            selected={this.props.startDate}
            onChange={this.props.handleChange} />
        </div>
      </div>

    );
  }
};

export default ModalCalendar;  