import React from 'react';
import './calendar.css';
import dateFns from "date-fns";



class Calendar extends React.Component{

    state = {
            currentMonth: new Date(),
            isVisible: false,
    }

    // Month/Year

    onClick = (e) => {
        if (e.target.classList.contains('arrow-f')) {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
        } else {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
        }
    }

    header() {
        const dateFormat = "MMMM YY";

        return(
            <div className="flex-row head">
                <div>
                    <div className="material-icons arrow-b" onClick={this.onClick}>arrow_back_ios</div>
                </div>
                <div className="month">
                    {dateFns.format(this.state.currentMonth, dateFormat)}
                </div>
                <div>
                    <div className="material-icons arrow-f" onClick={this.onClick}>arrow_forward_ios</div>
                </div>
            </div>
     )
    } // end month/year

    // Weekday headings

    days() {
        const dateFormat = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
            <div className="flex-col days" key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
            );
        }

        return (
            <div className="flex-row">{days}</div>
        )
    } // end weekday headings

    // Calendar content

    reveal = (e) => {
        if (this.state.isVisible == false) {
            this.setState({
                isVisible: true,
            })
            e.target.querySelector('.content').classList.add('content-show');
        }
    };

    hide = (e) => {
        if (this.state.isVisible == true) {
            this.setState({
                isVisible: false,
            })
            e.target.classList.remove('content-show');
        }
    };



    weeks() {
        const monthStart = dateFns.startOfMonth(this.state.currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const weeks = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        let contentDate = ""

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              formattedDate = dateFns.format(day, dateFormat);
              contentDate = dateFns.format(day, "D MMMM YY");
              days.push(
                <div
                  className={`cell 
                  ${!dateFns.isSameMonth(day, monthStart) ? "disabled": ""} 
                  ${dateFns.isToday(day, monthStart) ? "today": ""}
                  `}
                  onClick={this.reveal}
                  key={day}>
                  <span className="number">{formattedDate}</span>
                  {/* <textarea className="appt"></textarea> */}
                  <div className={`content ${dateFns.format(this.state.currentMonth, "MMMM")+'-slide'}`} onClick={this.hide}>
                    <h3>{contentDate}</h3>
                    <h5>Things to Do</h5>
                  </div>
                </div>
              );
              day = dateFns.addDays(day, 1);
            }
            weeks.push(
              <div className="flex-row weeks" key={day}>
                {days}
              </div>
            );
            days = [];
          }

        return(
            <div className="grid flex-col">{weeks}</div>
        )
    } // calendar content

    // render content

    render() {
        return (
            <div className={`switch ${dateFns.format(this.state.currentMonth, "MMMM")}`}>
                {this.header()}
                {this.days()}
                {this.weeks()}
            </div>
        )
    }
}

export default Calendar;