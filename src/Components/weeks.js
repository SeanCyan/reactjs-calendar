import React from 'react';
import dateFns from "date-fns";

class Weeks extends React.Component{

    render() {

        const monthStart = dateFns.startOfMonth(this.props.currentMonth);
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
                  onClick={this.props.reveal}
                  key={day}>
                  <span className="number">{formattedDate}</span>
                  <div className={`content ${dateFns.format(this.props.currentMonth, "MMMM")+'-slide'}`}>
                    <span className="closeBtn" onClick={this.props.hide}>✕</span>
                    <h3>{contentDate}</h3>
                    <h5>Things to Do</h5>
                    <input  type="text" className="addTodo" onChange={e => this.props.input(e)} placeholder="Today I need to..." />
                    <span onClick={this.props.add} className="addBtn">Add</span>
                    <ul className="todoList">
                        {this.props.todo.map( (task, index) =>
                                <li key={index} id={task.value} className="todoListItem">{task.value.toUpperCase()}
                                    <span className="completeBtn" id={task.value} onClick={e => this.props.complete(e)}>✓</span>
                                    <span className="deleteBtn" id={task.value} onClick={e => this.props.delete(e)}>✕</span>
                                </li>
                         )}
                    </ul>
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

        return (
            <div className="grid flex-col">{weeks}</div>
        )
    }
}

export default Weeks;