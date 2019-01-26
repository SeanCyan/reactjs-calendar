import React from 'react';
import dateFns from "date-fns";

class Days extends React.Component{

    render() {

        const dateFormat = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.props.currentMonth);

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
    }
}

export default Days;